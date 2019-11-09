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
    this.params.concat.play = 0;
    this.params.concat.period = [0, 1];

    this.params.player.concat_preset = 1;
    this.params.player.granular_preset = 1;


    this.params.granular.play = 1;
    this.params.concat.resampling = 0;
    this.params.knn.weightPreset = 1;
    switch (timbreName) {
      case 'fork':
        this.knnInclude('cymbal');
        this.params.player.granular_preset = 3;
        break;
      case 'bow_hi':
        this.params.concat.period = [(Math.random() * 50) + 10, 0];
        this.knnInclude('organ', 'cymbal', 'knock');
        break;
      case 'bow_lo':
        this.params.concat.period = [160, 0];
        this.params.concat.resampling = -700;
        this.params.concat.play = 1;
        this.params.granular.play = 1;
        this.knnInclude('organ', 'knock');
        break;
      case 'pluck':
        this.params.concat.play = 1;
        this.params.granular.play = 0;
        this.knnInclude('wrench', 'knock', 'cymbal');
        break;
      case 'tap':
        this.params.concat.play = 1;
        this.params.granular.play = 0;
        this.params.knn.weightPreset = 2;
        this.knnInclude('wrench', 'cymbal');
        break;
    }

    // return array of param keys that should get updated in the maxpatch via the sendParams method
    return ['knn', 'player', 'concat', 'granular'];
  }
}
