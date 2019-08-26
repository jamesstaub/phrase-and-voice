const Max = require("max-api");

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

//KNN weidhts preset object 
WEIGHT_PRESETS = {
  "tonal": 1,
  "timbral": 2,
  "hybrid": 3,
}

/*
  timbre modal trained classes
  1. bowed harmonics
  2. bowed bass/tenor range notes
  3. plucked  stoccato bass/tenor range notes
  4. tapping, scratching on body/bridge of bass (no tone)
*/
GMM_CLASS = {
  "bowed_harmonic": 1,
  "bowed_tenor": 2,
  "plucked_tenor": 3,
  "percussive": 4,

}

/*
  umuenu object in the player patch which determine's the playback mode
*/
PLAYMODE = {
  'repeat': 0,
  'increment': 1,
  'random': 2,
  'onset-knn': 3
}

/* MUBU buffer to play from  */
PLAYER_SOURCE = {
  'temporalmodel': 0, // buffer recorded in temporal model patcher
  'corpus': 1 // files loaded in player patcher
}

CORPUS_BUFFERS = {
  'arvo': [1],
  'bassoon': [2],
  'choices': [3,4,5,6],
  'knock': [7,8,9,10],
  'organ': [11,12],
  'wrench': [13],
}

let part = 1;
let beat = 0;
let bar = 0;

/*
	Default Parameters
  top-level keys of this object are namespaces that are routed to [send] objects as a list
  with a parameter name and a value 
*/
const params = {
  knn: {
    weightPreset: 1,
    includedBuffers: 0,
    randomizeWeights: 0,
  },
  player: {
    playmode: 3, // 'onset-knn'
    // source: 1, //  'corpus'
  },
  concat: {
    allowrepeatmarkers: 0,
    play: 1,
    period: [0, 1], //(abs, relative)
    // resampling: 0,
    // resamplingvar:[0, 0],
    filtermode: 'off',
    // TODO hook up following
    filterfreq: 400 ,
    // filterfreqvar $1 $2
    filterq: 0,
    // filterqvar $1 $2
    filtergain:0,
    // off, lowpass, highpass, resonant, bandpass, peaknotch, bandstop, allpass, lowshelf, highshelf
    attack: [0,0],
    release: [0,0],
    reverse: 0,
  },
  // temporalModel: {
  //   bufferindex: 1,
  //   play: 0,
  //   gain: 0,
  // },
  // timbralModel: {
  //   play: 1,
  // },
  automation: {
    // toggle a subpatcher that modulates concatenative synth's period
    concat_period: 0,
    weight_preset:0,
    filter_fundamental_follow: 0, // send fundamental frequency from input signal to concat synth filter 
  }
}

const part1 = {
  onGmmClass(gmmIs) {
    params.knn.randomizeWeights = 1;
    params.concat.filtermode = 'off';
    params.automation.filter_fundamental_follow = 0;
    params.concat.reverse = 0;
    params.concat.attack = [0, 0];
    params.concat.release = [0, 0.1];
    params.automation.onset_follow = 0;

    if ((bar % 50) > 40) {
      params.knn.includedBuffers = CORPUS_BUFFERS['choices'];
    } else if ((bar % 50) > 30){
      params.knn.includedBuffers = [CORPUS_BUFFERS['choices'][2], CORPUS_BUFFERS['choices'][3]];
    } else {
      params.knn.includedBuffers = [CORPUS_BUFFERS['choices'][0], CORPUS_BUFFERS['choices'][1]];
    }
    
    /**
    *  when percussive input is detected, set knn weights to select for timbre
    * and select a repeating
    */

    if (gmmIs('percussive')) {
      params.knn.weightPreset = WEIGHT_PRESETS['timbral'];

      params.concat.period = [200, .125];
      params.concat.allowrepeatmarkers = 1;
      // params.automation.concat_period = 0;
      params.concat.resampling = -700
      params.knn.includedBuffers = [CORPUS_BUFFERS['organ'][0], CORPUS_BUFFERS['choices'][2]];
      params.automation.onset_follow = 1;

    } else if (gmmIs('bowed_harmonic')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.automation.concat_period = 1;
      params.knn.randomizeWeights = 0;
      
      // params.concat.resampling = [0, 0, 700, 1200, 2400][Math.floor(Math.random() * 5)];
    } else if (gmmIs('bowed_tenor')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      // params.concat.resampling = [0, 0, 700, 1200, -1200][Math.floor(Math.random() * 5)];
      params.automation.concat_period = 0;


    } else {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.allowrepeatmarkers = 1;
      params.concat.resampling = -700;
      params.concat.period = [50, .25];
      params.knn.randomizeWeights = 1;
    }
  }
}



const part2 = {
  onGmmClass(gmmIs) {
    params.concat.reverse = 0;
    params.concat.filtermode = 'off';
    params.concat.attack = [0, 0];
    params.concat.release = [0, 0.1];
    params.automation.onset_follow = 0;
    params.automation.filter_fundamental_follow = 0;
    
    if ((bar % 50) > 40) {
      params.knn.includedBuffers = CORPUS_BUFFERS['knock'][3];
    } else if ((bar % 50) > 25) {
      params.knn.includedBuffers = [CORPUS_BUFFERS['knock'][1], CORPUS_BUFFERS['knock'][2]];
    } else {
      params.automation.onset_follow = 1;
      params.knn.includedBuffers = [CORPUS_BUFFERS['knock'][0], CORPUS_BUFFERS['knock'][1]];

    }

    

    if (gmmIs('percussive')) {
      params.knn.weightPreset = WEIGHT_PRESETS['hybrid'];
      params.concat.allowrepeatmarkers = 1;
      params.automation.onset_follow = 1;
    } else if (gmmIs('bowed_harmonic')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.allowrepeatmarkers = 1;
      params.concat.period = [100, 1];
    } else if (gmmIs('bowed_tenor')) {
      params.knn.weightPreset = WEIGHT_PRESETS['hybrid'];
      // params.concat.resampling = [-1200, -2400][Math.floor(Math.random() * 2)];
      params.concat.allowrepeatmarkers = 0;
    } else if (gmmIs('plucked_tenor')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];

      params.automation.concat_period = !beat % 4;
      params.concat.reverse = beat % 2;

      params.concat.allowrepeatmarkers = 0;
      params.automation.onset_follow = 1;
    } 
  }
}


const part3 = {
  onGmmClass(gmmIs) {
    params.automation.onset_follow = 0;
    params.concat.reverse = 0;
    params.concat.filtermode = 'off';
    params.concat.allowrepeatmarkers = 1;
    params.concat.period = [80, 0];
    params.concat.attack = [0, 0];
    params.concat.release = [0, 0.1];
    
    params.knn.includedBuffers = [...CORPUS_BUFFERS['organ']];
    params.knn.includedBuffers = [...CORPUS_BUFFERS['wrench'], ...CORPUS_BUFFERS['bassoon']];
    
    if (gmmIs('bowed_tenor') || gmmIs('bowed_harmonic')) {
      params.concat.filtermode = 'resonant';
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.filterq = rand([2,3, 4,8,10]);
      params.automation.filter_fundamental_follow =  1;
    } else if (gmmIs('plucked_tenor')) {
      params.concat.filtermode = 'off';
      params.knn.weightPreset = WEIGHT_PRESETS['timbral'];
      params.concat.period = [240, 0];
    } else {
      params.concat.filtermode = 'off';
      params.concat.period = [160, 0];
      params.automation.onset_follow = 1;
      params.knn.weightPreset = WEIGHT_PRESETS['hybrid'];
      params.automation.filter_fundamental_follow = 0;
    }

  } 
}

const part4 = {
  onGmmClass(gmmIs) {
    params.concat.allowrepeatmarkers = 1;
    params.concat.reverse = 0;
    params.concat.filtermode = 'off';
    params.knn.randomizeWeights = 0;
    params.concat.attack = [0, 0.15];
    params.concat.release = [0, 0.1];
    params.automation.onset_follow = 0;

    if ((bar % 50) < 25) {
      params.knn.includedBuffers = [...CORPUS_BUFFERS['arvo'], ...CORPUS_BUFFERS['knock']];
      params.concat.resampling = rand([0, 500, -1200, -2400]);
    } else {
      params.knn.includedBuffers = [...CORPUS_BUFFERS['arvo'], CORPUS_BUFFERS['knock'][3]];
    }

    if (gmmIs('percussive')) {
      params.knn.weightPreset = WEIGHT_PRESETS['timbre'];
      params.knn.includedBuffers = [CORPUS_BUFFERS['choices'], ...CORPUS_BUFFERS['knock']];
      params.knn.randomizeWeights = 1;
      params.automation.onset_follow = 1;
    } else if (gmmIs('bowed_harmonic')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.resampling = rand([0, 500, 700, 1200, 1500, 1900]);
      params.concat.period = [50, 0.25];
      params.concat.attack = [25, 0.5];
      params.concat.release = [25, 0.5];
    } else if (gmmIs('bowed_tenor')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.resampling = rand([0, 0, 0, -500, -700, -1200, -2400]);
      params.concat.attack = [25, 0.5];
      params.concat.reverse = 1;
    } else if (gmmIs('plucked_tenor')) {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.reverse = rand([0,1]);
      params.concat.resampling = 0;
      params.concat.period = [0, 0.3];
    } 
  }
}

let parts = [part1, part2, part3, part4];

const handlers = {
  onGmmClass(gmmClass) {
    // helper function for more readable code in evaluating gmm class
    const gmmIs = (key) => gmmClass === GMM_CLASS[key];
    const partToUse = parts[part-1]
    if (gmmClass) {
      partToUse.onGmmClass(gmmIs);
    }
  },

  onGateStatus(gateOpen) {
    // prevent a single segment from repeating endlessly once the input signal is silenced
    if (!gateOpen) {
      if (params.player.playmode !== 'repeat') { // dont do this if repeat playmode was deliberately set
        params.concat.allowrepeatmarkers = false
      }
    }
  }
}


// transport bars
Max.addHandler("bars", (currentBar) => {
  bar = currentBar
  // 40 bpm sets parts 1-4 at bar 0, 50 , 150, 200
  part = Math.ceil(currentBar / 40);
});

// transport beats
Max.addHandler("beats", (currentBeat) => {
  beat = currentBeat;
});

// true when noisegate is active (ie there is an input signal)
Max.addHandler("gate_status", (gateOpen) => {
  handlers.onGateStatus(gateOpen);
  sendParams(['concat']);
});

// gmm_class is the number of the gaussian mixture model prediction
Max.addHandler("gmm_class", (gmmClass) => {
  if (gmmClass) {
    handlers.onGmmClass(gmmClass);
  }
  sendParams(['concat', 'knn', 'automation']);
})




/*
	outputs the params object, which is routed to update various modules in the maxpatch
	called by various message handlers

  @param Array keysToSend (optional) - array of keys belonging to the params object, indicating which params to output.
  with no argument provided all params will be updated

*/
const sendParams = (keysToSend) => {
  let paramsEntries = Object.entries(params)
  if (keysToSend.length) {
    paramsEntries = paramsEntries.filter(([key, val])=> keysToSend.includes(key));
  }
  paramsEntries.forEach(([scope, attrs]) => {
    Object.entries(attrs).forEach(([attribute, value]) => {
      if (Array.isArray(value)) {
        Max.outlet([scope, attribute, ...value])
      } else if (typeof value !== 'undefined') {
        Max.outlet([scope, attribute, value]);
      }
    })
  });
}
