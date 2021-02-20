const Max = require("max-api");

/*
  This module provides an API to change parameters in this max patch in response to output of the timbral
  model patch and the transport.


  You can import this module into your own script and write your code in the provided hooks.
*/

module.exports = class PhraseAndVoice {
  constructor() {
    Max.removeHandlers(); // remove any previous handlers
    this.addMsgHandlers();


  /* audioGroups is an object containing names of groups of audio files
    loaded into MUBU buffers which can be referenced to
    enable/disable them from the KNN matching.
    for example if you define
    ```
      audioGroups = {
        'piano' = [2,3,4]
      }

    then call the following...
    ```
      this.params.knn.includedBuffers = this.audioGroups['piano'];
      this.sendParams(['knn'])
    ```
    it will tell the mubu.knn object to only match the input audio to segments of buffers 2,3 or 4.
   */
    this.audioGroups = {};
  }

  /*
    add message handlers to fire the above hooks and output
    parameters back to the objects in the max patch
  */
  addMsgHandlers() {
    // true when noisegate is active (ie there is an input signal)
    Max.addHandler("input_gate_status", (gateOpen) => {
      this.onInputGateChange(gateOpen);
    });

    // timbreId is the buffer index of timbre_modal mubu container
    // which is the result of  gaussian mixture model prediction
    Max.addHandler("timbre_id", (timbreId) => {
      if (timbreId) {
        this.onTimbreChange(timbreId);
      }
    });

    Max.addHandler("bar", (currentBar) => {
      this.bar = currentBar;
      this.onBar(currentBar);
    });

    // section is a generic property which can be updated by midi program changes or any other state change
    Max.addHandler("section", (currentSection) => {
      currentSection--; // inputs from MIDI programs start at 1, but the sections array is 0 indexed
      this.section = currentSection;
      this.onSection(currentSection);
    });

    // transport beats
    Max.addHandler("beat", (currentBeat) => {
      this.beat = currentBeat;
      this.onBeat(currentBeat);
    });
  }


/*
  called when the timbre model detection is running and a
  new timbre id is received

  @param String  timbreId is a string name of a mubu buffer from the timbral model
*/
  onTimbreChange(timbreId) {
    return;
  }

  /*
    called when the noisegate on the input signal changes
    @param Bool true when input signal is active
  */
  onInputGateChange(gateIsOpen) {
    return;
  }

  onBar(currentBar) {
    return;
  }

  onSection(currentSection) {
    return;
  }


  onBeat(currentBeat) {
    return;
  }

  /*
    sendParams iteratively outputs the params object's values, which are routed to update various modules in the maxpatch
    this method is called by various message handlers

    @param Array keysToSend (optional) - array of keys belonging to the params object, indicating which params to output.
    with no argument provided all params will be updated
    see defaultParams.js to understand structure of params object
  */
  sendParams(keysToSend) {
    let paramsEntries = Object.entries(this.params)
    if (keysToSend && keysToSend.length) {
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

  /*
    a helper method for setting the buffer indexes that are included in the knn matching.
    calling this method with
    @param groupName String - a string which is a key in the audioGroups object.

    calling the method
    ```
      knnInclude('piano')
    ```
    is equivalent to calling:
    ```
      this.params.knn.includedBuffers = this.audioGroups['piano']
      this.sendParams(['knn'])
    ```
  */
  knnInclude(audioGroupName, sendParams) {
    if (audioGroupName === 'all') {
      this.params.knn.includedBuffers = 0; // setting included buffers to 0 enables all
    } else {
      const argsArray = Array.from(arguments);
      // map and flatten array of arrays

      this.params.knn.includedBuffers = argsArray.map((key) => {
        if (!(this.audioGroups[key])) {
          throw `${key} is not an array defined in audioGroups`;
        }
        return this.audioGroups[key];
      }).reduce((acc, val) => acc.concat(val), []);

    }

    if (sendParams) {
      this.sendParams(['knn']);
    }
  }


}
