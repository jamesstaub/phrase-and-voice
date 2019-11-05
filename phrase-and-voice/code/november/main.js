const PhraseAndVoice = require('../phrase-and-voice.js');
const defaultParams = require('./defaultParams');

// sections
const Intro = require('./intro');
const SomeChoicesImplied = require('./some-choices-implied');
const Knock = require('./knock');


class Performance extends PhraseAndVoice {
  constructor(params) {
    super();
    /*
      once this.params gets set on the class instance
      you can continually update the values of params
      as they will get output to the maxpatch after each
      on*Change hook is called.
    */

    this.params = params;

    // const intro
    this.sections = [Intro, SomeChoicesImplied, Knock];
    this.onSection(0);
  }

  onSection(section) {
    this.currentSection =  new this.sections[section](this.params);
    this.sendParams(); // update all params;
  }

  onTimbreChange(timbreId) {
    if (this.currentSection.onTimbreChange) {
      const paramsToUpdate = this.currentSection.onTimbreChange(timbreId);
      this.sendParams(paramsToUpdate);
    }
  }

  onInputGateChange(gateIsOpen) {
    if (this.currentSection.onInputGateChange) {
      this.currentSection.onInputGateChange(gateIsOpen);
      this.sendParams(paramsToUpdate);
    }
  }
}

/*
  create an instance of the performance to begin listening for
  and responding to messages.

  Performance class is instantiated with default patcher params.

*/

new Performance(defaultParams);
