module.exports = {

  knn: {
    weightPreset: 1,
    includedBuffers: 0,
    randomizeWeights: 0,
  },
  player: {
    playmode: 3, // 'onset-knn'
    // source: 1, //  'corpus',
    concat_preset: 1,// sets mubu.concat's params based on params saved in a preset object
    granular_preset: 1, // sets mubu.granular's params based on params saved in a preset object
  },
  concat: {
    allowrepeatmarkers: 0,
    play: 1,
    period: [0, 1], //(abs, relative)
    resampling: 0,
    resamplingvar:[0, 0],
    filtermode: 'off', // off, lowpass, highpass, resonant, bandpass, peaknotch, bandstop, allpass, lowshelf, highshelf
    filterfreq: 400,
    filterfreqvar: [0, 0],
    filterq: 0,
    filterqvar: [0, 0],
    filtergain: 0,
    attack: [0, 0],
    release: [0, 0],
    reverse: 0,
  },
  granular: {
    play: 1,
    gated_by_input: 1, // granular will only sound when an input audio signal is sounding
    filtermode: 'off',
  },
  TemporalModel: {
    bufferindex: 1,
    play: 0,
    gain: 0,
  },
  TimbralModel: {
    play: 1,
  },
  // TODO: replace automation wtih Plugins after implementing a few plugins
  automation: {
    // toggle a subpatcher that modulates concatenative synth's period
    concat_period: 0,
    weight_preset: 0,
    filter_fundamental_follow: 0, // send fundamental frequency from input signal to concat synth filter
  }

}
