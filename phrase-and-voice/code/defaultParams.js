module.exports = {

  knn: {
    weightPreset: 1,
    includedBuffers: 0,
    randomizeWeights: 0,
  },
  player: {
    playmode: 3, // 'onset-knn'
    // source: 1, //  'corpus'
  },
  concat: {
    allowrepeatmarkers: 0,
    play: 1,
    period: [0, 1], //(abs, relative)
    // resampling: 0,
    // resamplingvar:[0, 0],
    filtermode: 'off',
    // TODO hook up following
    filterfreq: 400,
    // filterfreqvar $1 $2
    filterq: 0,
    // filterqvar $1 $2
    filtergain: 0,
    // off, lowpass, highpass, resonant, bandpass, peaknotch, bandstop, allpass, lowshelf, highshelf
    attack: [0, 0],
    release: [0, 0],
    reverse: 0,
  },
  // temporalModel: {
  //   bufferindex: 1,
  //   play: 0,
  //   gain: 0,
  // },
  // timbralModel: {
  //   play: 1,
  // },
  automation: {
    // toggle a subpatcher that modulates concatenative synth's period
    concat_period: 0,
    weight_preset: 0,
    filter_fundamental_follow: 0, // send fundamental frequency from input signal to concat synth filter 
  }

}