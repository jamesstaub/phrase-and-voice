const PhraseAndVoice = require('../phrase-and-voice.js');
const defaultParams = require('./defaultParams');

// sections
const Intro = require('./intro');
const SomeChoicesImplied = require('./some-choices-implied');
const Knock = require('./knock');
const KnockDrone = require('./knock-drone');
const End = require('./end');

/*
  README
  before running this script:
  Create a Timbre Model with the following buffer names
  fork bow_hi bow_low pluck tap
*/

class Performance extends PhraseAndVoice {
  constructor(params) {
    super();

    this.audioGroups = {
      'hawthorn': [1],
      'cymbal': [2],
      'choices': [3, 4, 5, 6],
      'knock': [7, 8, 9, 10],
      'organ': [11, 12],
      'wrench': [13],
    }

    /*
      once this.params gets set on the Performance instance
      you can continually update the values of params
      as they will get output to the maxpatch any time sendParams()
      is called.
    */
    this.params = params;

    /*
      each section is a subclass of Performance.
    */
    this.sections = [Intro, KnockDrone, Knock, SomeChoicesImplied, End];
    this.onSection(0);
  }

  onSection(section) {
    const SectionClass = this.sections[section];
    this.currentSection = new SectionClass(this.params, this.audioGroups, this.sendParams, this.knnInclude);
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



/*

Notes
TODO: queue sendParams so multiple calls only output once in a method


*/
