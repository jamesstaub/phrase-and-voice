const defaultParams = require('./defaultParams');

module.exports = class Intro {

  constructor(params, audioGroups, sendParams, knnInclude) {
    this.sendParams = sendParams;
    this.params = defaultParams;
    this.sendParams();

    console.log('choices');
    // pass objects + methods from parent class that
    // are set or called here
    // TODO replace this pattern with proper inheritance
    this.params = params;
    this.audioGroups = audioGroups;

    this.knnInclude = knnInclude;

    //set some initial parameters
    this.params.granular.gated_by_input = 1;

    this.sendParams();
  }

  onTimbreChange(timbreName) {
    this.params.knn.includedBuffers = [3, 4];

    this.params.granular.play = 1;
    this.params.concat.play = 1;

    this.params.player.concat_preset = 1;
    this.params.player.granular_preset = 4;

    this.params.knn.randomizeWeights = 0;
    switch (timbreName) {
      case 'fork':
        break;
      case 'bow_hi':
        this.params.player.concat_preset = [1, 4][Math.round(Math.random())];
        this.params.knn.weightPreset = 1;
        break;
      case 'bow_lo':
        this.params.knn.weightPreset = 1;
        break;
      case 'pluck':
        this.params.knn.includedBuffers = [5, 6];
        this.params.knn.weightPreset = 3;
        break;
      case 'tap':
        this.params.knn.weightPreset = 2;
        this.knnInclude('wrench', 'choices');
        break;
    }

    // return array of param keys that should get updated in the maxpatch via the sendParams method
    return ['knn', 'player', 'concat', 'granular'];
  }
}
