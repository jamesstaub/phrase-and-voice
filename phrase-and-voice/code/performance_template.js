/**

This is an example of a script that can be loaded into the node.script object in phrase-and-voice/index.maxpatch

Here you can define message handlers to respond to different timbres output from the timbre detection model
and change parameters of the concatenative and granular synths

**/
const PhraseAndVoice = require('./phrase-and-voice.js');
const Max = require('max-api');

// defaultParams is where the keys are defined which get routed in Max to the various modules
const defaultParams = require('./defaultParams');

class Performance extends PhraseAndVoice {
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

  addMsgHandlers() {
    // setup the default message handlers
    super.addMsgHandlers();

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
    // replace pluck with one of the MUBU buffer names from the Timbre Model
    if (timbreId === 'pluck') {
      this.params.concat.reverse = 1;
    }
  }
}

/*
  create an instance of the performance to begin listening for
  and responding to messages.

  Performance class is instantiated with default patcher params.

  TODO: avoid rereadading handlers on each Performance instantiation
*/

new Performance(defaultParams);
