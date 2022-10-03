/**

This script copies slices from the flucoma-analyzed buffer into 
n separate buffers based on the umap clustering.

expects:
	src buffer of audio
	slices buffer containing location of slices (in samples) in the src buffer
	dictionary `data` which holds the cluster data from umap

The end result are separate buffers for each umap cluster, which
can be loaded into phrase+voice buffers


buffer.peek/poke arguments
channel, frame, samples

peek returns array with count samples from channel (1 based count) starting at frame (zero based)

poke samples may be value or array (int)

buffer.send (max msg)

frames are samples in a single channel
**/

var bufferAppendPositions;

function bang() {
	bufferAppendPositions = {}

	var d = new Dict("clusters"); // dictionary output by clustering
	var data = d.get('data');
	
	var slices = data.getkeys();

	slices.forEach(function(slice){
		var cluster = data.get(slice);
		appendSliceToBuffer(cluster, slice);
	})
}

function appendSliceToBuffer(cluster, slice) {
	slice = parseInt(slice);
	
	var slicesBuffer = new Buffer("slices");
	var destinationBuffer = findOrCreateBuffer(cluster)

	if (!bufferAppendPositions[destinationBuffer]) {
    	bufferAppendPositions[destinationBuffer] = 0;
	}
	
	
	var slicesArr = slicesBuffer.peek(1, slice, 2);
	var sliceStart = slicesArr[0];
	var sliceLength = slicesArr[1] - sliceStart;
	
			
	var padding = 1024;
	outlet(0, sliceStart, sliceLength, bufferAppendPositions[destinationBuffer], destinationBuffer);
	bufferAppendPositions[destinationBuffer] = bufferAppendPositions[destinationBuffer] + sliceLength;

}

function findOrCreateBuffer(idx){
	idx = parseInt(idx) + 1;
	return "cluster-" + idx;
}