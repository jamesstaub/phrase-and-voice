const Max = require("max-api");

const params = {
  knn: {
    weightPreset: 0,
    play: 0,
  },
  concat: {
    play: false,
    allowrepeatmarkers: false,
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
  }
}

const sendParams = () => {
  Object.entries(params).forEach(([key, params]) => {
    Object.entries(params).forEach(([property, value]) => {
      Max.outlet([key, property, value])
    });
  });

}

Max.addHandler("gate_status", (gateOpen) => {})
Max.addHandler("gmm_class", (gmmClass) => {
  params.knn.weightPreset = gmmClass === 4 ? 2 : 1;
  sendParams() 
})
Max.addHandler("concat_bang", () => {})
