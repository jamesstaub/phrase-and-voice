const Max = require("max-api");

//KNN weidhts preset object 
WEIGHT_PRESETS = {
  "tonal": 1,
  "timbral": 2,
  "hybrid": 3
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
  'guitar': [1,2,3,4],
  'bassoon': [5],
  'organ': [6,7],
}


/*
	Default Parameters
  top-level keys of this object are namespaces that are routed to [send] objects as a list
  with a parameter name and a value 
*/
const params = {
  knn: {
    weightPreset: 1,
    includedBuffers: 0
  },
  player: {
    playmode: 3, // 'onset-knn'
    source: 1, //  'corpus'
  },
  concat: {
    play: 1,
    allowrepeatmarkers: 0,
    period: [0, 1], //(abs, relative)
    resampling: 0,
    resamplingvar:[ 500, 0],
    filtermode: 'off',
    // TODO hook up following
    // filterfreq: 400 ,
    // filterfreqvar $1 $2
    // filterq $1
    // filterqvar $1 $2
    // filtergain $1
    // off, lowpass, highpass, resonant, bandpass, peaknotch, bandstop, allpass, lowshelf, highshelf
  },
  temporalModel: {
    bufferindex: 1,
    play: 0,
    gain: 0,
  },
  timbralModel: {
    play: 1,
  },
  automation: {
    // toggle a subpatcher that modulates concatenative synth's period
    concat_period: 0,
    weight_preset:0
  }
}

const handlers = {

  onGmmClass(gmmClass) {
    /**
     *  when percussive input is detected, set knn weights to select for timbre
     * and select a repeating
     */

    // helper function for evaluating gmm class
    const gmmIs = (key) => gmmClass === GMM_CLASS[key];

    if (gmmIs('percussive')) {
      params.knn.weightPreset = WEIGHT_PRESETS['timbral'];
      

      params.concat.period = [200, 1];
      params.concat.allowrepeatmarkers = 1;
      params.automation.concat_period = 0;
      params.concat.resampling = -700
      params.knn.includedBuffers = [...CORPUS_BUFFERS['organ']];
      
    } else if (gmmIs('bowed_harmonic')) {
      params.automation.concat_period = 1;
      params.knn.includedBuffers = 0;
      params.concat.resampling = [0, 0, 700, 1200, 2400][Math.floor(Math.random() * 5)]; 
    } else if (gmmIs('bowed_tenor')) { 
      params.concat.resampling = [0, 0, 700, 1200, -1200][Math.floor(Math.random() * 5)];
      params.automation.concat_period = 0;

    } else {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
      params.concat.allowrepeatmarkers = false;
      params.concat.resampling = 0
      params.knn.includedBuffers = 0
      params.automation.concat_period = 0;
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

// true when noisegate is active (ie there is an input signal)
Max.addHandler("gate_status", (gateOpen) => {
  handlers.onGateStatus(gateOpen);
  sendParams(['concat']);
});

// gmm_class is the number of the gaussian mixture model prediction
Max.addHandler("gmm_class", (gmmClass) => {
  handlers.onGmmClass(gmmClass);
  sendParams(['concat', 'knn', 'automation']);
})

Max.addHandler("concat_bang", () => { })


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