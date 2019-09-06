const Max = require("max-api");

/*
  This module provides an API to change parameters in this max patch in response to output of the timbral
  model patch and the transport.


  You can import this module into your own script and write your code in the provided hooks. 
*/

module.exports = class API {
  constructor() {
    this.bindMessages();
  }
    
  /*
    called when the timbre model detection is running and a
    new timbre id is received

    @param string timbreId is a string name of a mubu buffer from the timbral model
  */
  onTimbreChange(timbreId) {
    return;
  }

  /*
    called when the noisegate on the input signal
    changes
  */
  onInputGateChange(gateIsOpen) {
    return;
  }

  /*
    add message handlers to fire the above hooks and output 
    parameters back to the objects in the max patch
  */
  bindMessages() {
    // true when noisegate is active (ie there is an input signal)
    Max.addHandler("input_gate_status", (gateOpen) => {
      this.onGateChange(gateOpen);
      this.sendParams(['concat']);
    });

    // gmm_class is the number of the gaussian mixture model prediction
    Max.addHandler("timbre_id", (timbreId) => {
      if (timbreId) {
        this.onTimbreChange(timbreId);
      }
      this.sendParams(['concat', 'knn', 'automation']);
    });
  }
  
  /*
    outputs the params object, which is routed to update various modules in the maxpatch
    called by various message handlers

    @param Array keysToSend (optional) - array of keys belonging to the params object, indicating which params to output.
    with no argument provided all params will be updated
    see defaultParams.js to understand structure of params object
  */
  sendParams(keysToSend) {
    let paramsEntries = Object.entries(this.params)
    if (keysToSend.length) {
      paramsEntries = paramsEntries.filter(([key, val]) => keysToSend.includes(key));
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
}


