{
	"name" : "phrase and voice v2",
	"version" : 1,
	"creationdate" : 3682245889,
	"modificationdate" : 3696604124,
	"viewrect" : [ 0.0, 79.0, 368.0, 900.0 ],
	"autoorganize" : 0,
	"hideprojectwindow" : 0,
	"showdependencies" : 1,
	"autolocalize" : 0,
	"contents" : 	{
		"patchers" : 		{
			"Voice.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"input.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"input-normalize.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"corpus-analyze.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"knn-lookup.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"poly-concat.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"midi-map.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"Phrase.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"TonalVoice.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"poly-concat-sync.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"yin-gate.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"clocked-stack-distributor.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"temporal-model-sketch.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"performance.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1,
				"toplevel" : 1
			}
,
			"modeling-synth.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"AnalyzeTriggerCorpus.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"GMM.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1,
				"singleton" : 				{
					"bootpath" : "~/Documents/Max 8/Projects/phrase-and-voice/phrase and voice v2/patchers",
					"projectrelativepath" : "./patchers"
				}

			}

		}
,
		"code" : 		{
			"quantize-onsets.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"temporal-model-synth-params.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"scale-params.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}

		}
,
		"data" : 		{
			"tmp-model-matrix-presets.json" : 			{
				"kind" : "json",
				"local" : 1
			}
,
			"concat-params.json" : 			{
				"kind" : "json",
				"local" : 1
			}
,
			"midi-map.json" : 			{
				"kind" : "json",
				"local" : 1
			}

		}
,
		"externals" : 		{

		}

	}
,
	"layout" : 	{

	}
,
	"searchpath" : 	{

	}
,
	"detailsvisible" : 0,
	"amxdtype" : 0,
	"readonly" : 0,
	"devpathtype" : 0,
	"devpath" : ".",
	"sortmode" : 0,
	"viewmode" : 1
}
