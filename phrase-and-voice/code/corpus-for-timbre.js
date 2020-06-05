

function list()
{
	var a = arrayfromargs(arguments);
	var thresh = this.threshold;
	
	a = a.map(function(weight, i){
		return [weight, i];
	})
	.filter(function(weightIndex){ 
		var w = weightIndex[0];
		return w > thresh;
	})
	.map(function(weightIndex){
		return weightIndex[1] + 1 // timbre ids are 1 indexed
	});
	
	
	outlet(0, a);
	
}
