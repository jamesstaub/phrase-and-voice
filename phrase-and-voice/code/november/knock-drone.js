const defaultParams = require('./defaultParams');

module.exports = class Intro {

  constructor(params, audioGroups, sendParams, knnInclude) {
    this.sendParams = sendParams;
    this.params = defaultParams;
    this.sendParams();


    console.log('KNOCK-drone');
    // pass objects + methods from parent class that
    // are set or called here
    // TODO replace this pattern with proper inheritance
    this.params = params;
    this.audioGroups = audioGroups;

    this.knnInclude = knnInclude;

    //set some initial parameters
    this.params.granular.gated_by_input = 0;

    this.sendParams();
  }

  onTimbreChange(timbreName) {
    this.params.automation.concat_period = 0;
    this.params.player.concat_preset = 2;
    this.params.player.granular_preset = 4;
    this.params.concat.play = 1;
    this.params.granular.play = 1;
    this.params.concat.allowrepeatmarkers = 1;

    this.params.knn.randomizeWeights = 0;
    this.params.concat.resampling = 0;
    let period;
    let duration;
    switch (timbreName) {
      case 'fork':
        break;
      case 'bow_hi':
        this.params.player.granular_preset = 2;
        this.params.knn.weightPreset = 1;
        break;
      case 'bow_lo':
        this.params.player.granular_preset = 2;
        break;
      case 'pluck':
        this.params.concat.play = 1;
        this.params.concat.resampling = -1200;
        this.params.knn.weightPreset = 3;
        break;
      case 'tap':
        this.params.player.granular_preset = 5;
        this.params.player.concat_preset = 1;
        this.params.knn.weightPreset = 2;
        break;
    }
    this.knnInclude('choices');

    // return array of param keys that should get updated in the maxpatch via the sendParams method
    return ['knn', 'player', 'concat', 'granular'];
  }
}
