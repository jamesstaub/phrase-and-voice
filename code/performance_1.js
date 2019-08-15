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
	Default Parameters
*/
const params = {
  knn: {
    weightPreset: 0,
    play: 0,
  },
  concat: {
    play: false,
    allowrepeatmarkers: '',
    period: [],
    resampling: 0,
  },
  temporalModel: {
    bufferindex: 1,
    play: false,
    gain: 0,
  },
  timbralModel: {
    play: false,
  },
  automation: {
    // toggle a subpatcher that modulates concatenative synth's period
    concat_period: false
  }
}

const handlers = {

  onGmmClass(gmmClass) {
    if('percussive') {
      params.knn.weightPreset = WEIGHT_PRESETS['timbral'];
    } else {
      params.knn.weightPreset = WEIGHT_PRESETS['tonal'];
    }

    params.automation.concat_period = gmmClass === GMM_CLASS['bowed_harmonic'];

  }
}

/*
	outputs the params object
	called by various message handlers
*/

const sendParams = () => {
  Object.entries(params).forEach(([scope, attrs]) => {
    Object.entries(attrs).forEach(([attribute, value])=>{
      Max.outlet([scope, attribute, value])
    })
  });
}

// true when noisegate is active (ie there is an input signal)
Max.addHandler("gate_status", (gateOpen) => {

});

Max.addHandler("gmm_class", (gmmClass) => {
  handlers.onGmmClass(gmmClass)
  sendParams();
})

Max.addHandler("concat_bang", () => { })
