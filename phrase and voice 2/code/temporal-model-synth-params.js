var BUFFER = 1;
var mubusrc;

// analysis from temporal model that will get mapped to a given param
// eventually this should be passed in dynamically from MUBU, with min/max ranges and info field for type

// [descriptorName, temporalModelTrackName, columnIdx, type, min, max
var descriptors = [
  ["Time", 'onsets', null, 'milliseconds',  0, 10000], // time is not a numbered column
  ["Duration", 'onsets', 1, 'milliseconds', 10, 5000],
  ["Frequency", 'desc-segments', 1, 'frequency', 40, 1000], // fundamental frequency range, not full audible spectrum
  ["Energy", 'desc-segments', 2, 'floatRange', 0, 1],
  ["Periodicity", 'desc-segments', 3, 'floatRange', 0, 1],
  ["Loudness", 'desc-segments', 5, 'deciBel', -100, 0],
  ["Centroid", 'desc-segments', 6, 'frequency',  100, 5000],
];

function scale(val, minVal, maxVal, newMin, newMax)  {
  return newMin + (val - minVal) * (newMax - newMin) / (maxVal - minVal);
};

function freqToPitch(freq) {
  return Math.floor(69 + 12 * (Math.log(freq / 440) / Math.log(2)));
}
function pitch2freq (pitch) {
  return 440.0 * Math.pow(2, ((Math.floor(pitch) - 69) / 12));
};

// takes a a combined list of matrixcontrol states, chunks them out and updates tracks one by one
function updateAll() {
  var args = [].slice.call(arguments);

  while(args.length > 0) {
	var col = args.shift();
    var row = args.shift();
    var state = args.shift();
    post(col, row, state, '\n');
    post('len', args.length, '\n')
    update(col, row, state);
  }
}

// takes array of 3 numbers (matrixcontrol output)
function update(column, row, state) {
  mubusrc = new MubuJS("temporal-model");

  var paramConfigDict = new Dict("midi-map.json");
  var parameters = paramConfigDict.getkeys();
  if (parameters) {
    var descriptor = descriptors[column];
    var parameter = parameters[row];
    
    if (state) {
      _addParamTrack(parameter, descriptor, paramConfigDict);
    } else {
      _removeParamTrack(parameter);
    }
	post('done update \n')
  }
}

function _addParamTrack(parameter, descriptor, paramConfigDict) {
  var mapFn = _getParamMap(parameter, descriptor, paramConfigDict);
  // create a new column named for the parameter that will update the synth
  _cloneAndMap(parameter, descriptor, mapFn);
}

function _removeParamTrack(parameter) {
  // find by name and remove
  if (mubusrc.gettrack(1, parameter)) {
    mubusrc.removetrack(parameter)
  }
}


// create a new track from descriptors, which will be mapped to some parameter
// takes mubu container name, destinationTrack name
function _cloneAndMap(destinationName, descriptor, mapFn) {
  if (mubusrc != null) {
    // the track we're copying from (onsets or descriptors)
    var trackName = descriptor[1];
    var track = mubusrc.gettrack(BUFFER, trackName);

    var timeTags = track.gettime();
    if (track != null) {
      var newTrack;
      var values = [];
      if (descriptor[1] === "Time") {
        values = timeTags;
      } else {
        values = track.getmxcolumn(descriptor[2]);
      }
      if (values && values.length) {
        var newValues = values.map(mapFn);
        newTrack = _createNewTrack(mubusrc, destinationName, values.length);
        // newTrack.settime(0, timeTags);
        // iterate over the old track rows and call the map function to append the new value to the new track
        newTrack.append(values.length, newValues);
        // for (var index = 0; index < values.length; index++) {
        //   var mappedValue = mapFn(values[index]).toString(); // not sure why mubu wants numbers as string
        //   newTrack.append(timeTags[index], mappedValue);
        //   newTrack.settime(index, [timeTags[index]]);
        // }
        newTrack.release();
		post('release new track \n')
      } else {
        post("no data in temporal model \n");
      }
      track.release();
    } else post("track is NULL");
  } else post("mubu is NULL");
}

function _createNewTrack(mubusrc, destinationName, len) {
  var maxsize = len;
  var mxrows = 1
  var mxcols = 1;
  var config = "@name " + destinationName + " @matrixcols 1 @timetagged no @info gui interface bpf";
  var newTrack = mubusrc.addtrack(maxsize, mxrows, mxcols, config);
  return newTrack;
}

// for a given pair of parameter+descriptor, return a map function that is to be called on
// each element of descriptors 
function _getParamMap(parameter, descriptor, paramConfigDict) {
  var descriptorType = descriptor[3];
  var descriptorMin = descriptor[4];
  var descriptorMax = descriptor[5];

  // methods chosen based on the type of parameter
  // each method checks the type of the descriptor that is being mapped
  // and makes some assumptions on how best to map the descriptor to the param
  // eventually the descriptor params shouls be pulled in externally with min/max values for each

  // paramDetails is an array with the type of value (steps, milliseconds, frequency etc), followed optionally by min, max, default
  var paramDetails = paramConfigDict.get(parameter);
  var paramType = paramDetails.shift();

  var parameterMin = paramDetails[0];
  var parameterMax = paramDetails[1];
  
  switch (paramType) {
    case 'steps':
      return function(value) {
        if (value) {
          switch (descriptorType) {
            case 'frequency':
              return freqToPitch(value) % 24;
            case 'milliseconds':
              return Math.floor(value / 500)
            case 'deciBel':
              return freqToPitch(Math.abs(scale(value, -100, 0, 20, 10000)));
            default:
              return scale(value, descriptorMin, descriptorMax, parameterMin, parameterMax)
          }
        } else {
          return 0;
        }
      }
  
    case 'milliseconds':
      return function(value) { 
        return value;
      }
  
    case 'frequency':
      return function(value) {
        switch (descriptorType) {
          case 'frequency':
            return value;
          case 'milliseconds':
            // map a time param to the frequency range where seconds = chromatic steps
            return pitchToFreq((value / 1000) % 127);
          case 'deciBel':
            return pitchToFreq(Math.abs(scale(value, -100, 0, 0, 127)));
          default:
            return scale(value, 0., 1, 40, 10000);
        }
      }
  
    case 'intRange':
      return function(value) {
        return scale(value, descriptorMin, descriptorMax, parameterMin, parameterMax )
      }
  
    case 'floatRange':
      return function(value) {
        return value;
      }
    
    // case 'bool':
    //   return function(value) {}
  
    default:
      return function(value) { 
        return 0; 
      };
  }
}