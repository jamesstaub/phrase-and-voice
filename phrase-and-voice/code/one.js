/* Performance 1 */

const API = require('../main.js');
const Max = require('max-api');

const defaultParams = require('../defaultParams');

class Part extends API {
  constructor(params) {
    super();
    /* 
      once this.params gets set on the class instance 
      you can continually update the values of params 
      as they will get output to the maxpatch after each 
      on*Change hook is called.
    */

    this.params = params
  }

  bindMessages() {
    // setup the default message handlers 
    super.bindMessages();

    // then add your own custom message handlers

    Max.addHandler("bars", (currentBar) => {
      this.bar = currentBar;
    });

    // transport beats
    Max.addHandler("beat", (currentBeat) => {
      this.beat = currentBeat;
    });
  }

  onTimbreChange(timbreId) {
    if (timbreId === 'plucked_tenor') {
      this.params.concat.reverse = 1;
    }
  }
}

/* 
  create an instance of the performance to begin listening for 
  and responding to messages.
  
  Performance class is instantiated with default patcher params.

*/

new Part(defaultParams);