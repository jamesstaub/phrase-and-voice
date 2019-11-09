module.exports = class Intro {

  constructor(params, audioGroups, sendParams, knnInclude) {
    // pass objects + methods from parent class that
    // are set or called here
    // TODO replace this pattern with proper inheritance
    this.params = params;
    this.audioGroups = audioGroups;
    this.sendParams = sendParams;
    this.knnInclude = knnInclude;

    //set some initial parameters
    this.params.granular.gated_by_input = 1;

    this.sendParams();
  }

  onTimbreChange(timbreName) {
    this.knnInclude('knock');
    this.params.knn.includedBuffers = [7, 8];
    this.params.automation.concat_period = 0;
    this.params.player.concat_preset = 1;
    this.params.player.granular_preset = 4;
    
    switch (timbreName) {
      case 'fork':
        break;
      case 'bow_hi':
        this.params.automation.concat_period = Math.round(Math.random());
        this.params.player.concat_preset = [1,4][Math.round(Math.random())];
        break;
      case 'bow_lo':
        this.params.player.granular_preset = 2;
        break;
      case 'pluck':
        this.params.knn.includedBuffers = [9, 10];
        break;
      case 'tap':
        this.knnInclude('cymbal');
        break;
    }

    // return array of param keys that should get updated in the maxpatch via the sendParams method
    return ['knn', 'player', 'concat', 'granular'];
  }
}
