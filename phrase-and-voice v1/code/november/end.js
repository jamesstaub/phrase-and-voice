const defaultParams = require('./defaultParams');

module.exports = class Intro {

  constructor(params, audioGroups, sendParams, knnInclude) {
    this.sendParams = sendParams;
    this.params = defaultParams;
    this.sendParams();
    console.log('end');
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
    this.params.concat.play = 1;
    this.params.player.concat_preset = 3;
    this.params.player.granular_preset = 2;

    this.params.granular.play = 1;
    this.params.concat.resampling = 0;
    this.params.knn.weightPreset = 1;

    this.params.knn.randomizeWeights = 0;
    switch (timbreName) {
      case 'fork':
        this.knnInclude('all');
        this.params.knn.weightPreset = 1;
        break;
      case 'bow_hi':
        this.params.knn.randomizeWeights = 1;
        this.knnInclude('organ', 'hawthorn', 'knock', 'choices');
        this.params.knn.weightPreset = 1;
        break;
      case 'bow_lo':
        this.params.knn.randomizeWeights = 1;
        this.params.concat.resampling = -1200;
        this.params.concat.play = 1;
        this.params.granular.play = 1;
        this.params.player.granular_preset = 3;
        this.knnInclude('organ', 'hawthorn', 'knock', 'choices');
        break;
      case 'pluck':
        this.params.concat.play = 1;
        this.params.granular.play = 0;
        this.params.knn.weightPreset = 3;

        this.knnInclude('wrench', 'knock', 'cymbal');
        break;
      case 'tap':
        this.knnInclude('wrench', 'cymbal', 'organ');
        this.params.knn.weightPreset = 2;
        break;
    }

    // return array of param keys that should get updated in the maxpatch via the sendParams method
    return ['knn', 'player', 'concat', 'granular'];
  }
}
