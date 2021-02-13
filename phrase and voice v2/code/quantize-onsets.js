/**
This script should get called after the temporal model MUBU buffer is recorded.

It will iterate through the selected columns of the onsets and descriptors tracks
and write new columns with usable values for synthesis.

This pre-calculated column will reduce the amount of calcualtion necessary in realtime 
when modulating the concat-synth parameters per-segment 

**/

var mubu = null;
var maintrack = null;
var BUFFER = 1;

function subdivisions(bpm) {
  var interval = 60000 / bpm;
  return [
    interval * 4,
    interval * 2,
    interval,
    interval / 2,
    interval / 3,
    interval / 4,
    interval / 5,
    interval / 8,
    interval / 16,
    interval / 32,
    interval / 64,
  ];
}

function freqToPitch(freq) {
  return Math.floor(69 + 12 * Math.log2(freq / 440));
}
function pitch2freq (pitch) {
  return 440.0 * Math.pow(2, ((Math.floor(pitch) - 69) / 12));
};

function nearestValue(arr, val) {
  return (
    arr.reduce(function (p, n) {
      return Math.abs(p) > Math.abs(n - val) ? n - val : p;
    }, Infinity) + val
  );
}

function trackColumn(mubuname, trackname, bufferId, colIdx, fn) {
  var mubusrc = new MubuJS(mubuname);
  if (mubusrc != null) {
    var track = mubusrc.gettrack(bufferId, trackname);
    var colValues = track.getmxcolumn(colIdx);
    if (track != null && colValues) {
      fn(track, colValues);
    }
    track.release();
  } else {
    post("mubu is NULL");
  }
}

function quantizeDurations(mubuname, trackname, bpm) {
  var DURATION_COL = 1; // intput durations to quantize
  var QUANTIZED_DURATION_COL = 3; //output
  // quantize duration value to nearest based on tempo
  trackColumn(mubuname, trackname, BUFFER, DURATION_COL, function (
    track,
    colValues
  ) {
    var outputCol = [];
    for (j = 0; j < colValues.length; j++) {
      outputCol[j] = nearestValue(subdivisions(bpm), colValues[j]);
    }
    track.setmxcolumn(QUANTIZED_DURATION_COL, 0, outputCol);
  });
}


function quantizePitch(mubuname, trackname) {
  var FUNDAMENTAL_FREQ_COL = 1; // intput durations to quantize
  var QUANTIZED_FUNDAMENTAL_FREQ_COL = 10; //output
  // quantize duration value to nearest based on tempo
  trackColumn(mubuname, trackname, BUFFER, FUNDAMENTAL_FREQ_COL, function (
    track,
    colValues
  ) {
    var outputCol = [];
    for (j = 0; j < colValues.length; j++) {
      // temporal model only needs a single column for the midi note value (could be quantized to equal temprament and scaled to good range)
      // then the corpus needs the following
      // TODO create column for MIDI note AND distance in cents to the nearest C
      // eg Math.min(nearestValue(0,12,24,36 etc, pitch) - pitch), (nearestValue(0,12,24,36 etc, pitch) + pitch)) //(maybe?)
      // concat resampling can take this param + the midi value from the temporal model to achieve target transposition
      freqToPitch
    }
    track.setmxcolumn(QUANTIZED_FUNDAMENTAL_FREQ_COL, 0, outputCol);
  });
}
