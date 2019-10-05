const API = require('../main.js');
const Max = require('max-api');

// defaultParams is where the keys are defined which get routed in Max to the various modules
const defaultParams = require('../defaultParams');

class Part extends API {
  constructor(params) {
    super();
    /* 
      once this.params gets set on the class instance 
      you can continually update the values of params 
      as they will get output to the maxpatch after each 
      on[message]Change hook is called.
    */

    this.params = params
  }

  bindMessages() {
    // setup the default message handlers 
    super.bindMessages();

    // then add your own custom message handlers

    // transport current bar
    Max.addHandler("bars", (currentBar) => {
      this.bar = currentBar;
    });

    // transport current beat
    Max.addHandler("beat", (currentBeat) => {
      this.beat = currentBeat;
    });
  }

  onTimbreChange(timbreId) {
    // example of how to change params when timbre changes
    if (timbreId === 'plucked_tenor') {
      this.params.concat.reverse = 1;
    }
  }
}

/* 
  create an instance of the performance to begin listening for 
  and responding to messages.
  
  Performance class is instantiated with default patcher params.

  TODO: avoid rereadading handlers on each Part instantiation
*/

new Part(defaultParams);