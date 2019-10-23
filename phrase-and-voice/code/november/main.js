const PhraseAndVoice = require('../phrase-and-voice.js');
const Max = require('max-api');

const defaultParams = require('./defaultParams');

// sections
const someChoicesImplied = require('./some-choices-implied');
const knock = require('./knock');


class Performance extends PhraseAndVoice {
  constructor(params) {
    super();
    /*
      once this.params gets set on the class instance
      you can continually update the values of params
      as they will get output to the maxpatch after each
      on*Change hook is called.
    */

    this.params = params
    this.sections = [someChoicesImplied, knock];
    this.currentSection = this.sections[0];
  }

  onBar(currentBar) {
    // set the current section based on the current bar of the transport
    // and this.performanceLengthBars
    const currentSectionIdx = currentBar % this.sections.length;
    this.currentSection = this.sections[currentSectionIdx];
  }

  onTimbreChange(timbreId) {
    this.currentSection.onTimbreChange(timbreId);
  }

  onInputGateChange(timbreId) {
    this.currentSection.onInputGateChange(timbreId);
  }
}

/*
  create an instance of the performance to begin listening for
  and responding to messages.

  Performance class is instantiated with default patcher params.

*/

new Performance(defaultParams);
