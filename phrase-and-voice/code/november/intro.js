module.exports = class Intro {
  constructor(params) {
    this.params = params;
  }

  onTimbreChange(timbreId) {
    //  set params
    this.params.player.concat_preset = timbreId;
    this.params.player.granular_preset = timbreId;
    
    // return array of params that should get updated in the maxpatch via the sendParams method
    return ['player'];
  }
}
