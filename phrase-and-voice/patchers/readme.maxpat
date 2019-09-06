{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 874.0, 79.0, 772.0, 933.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"fontface" : 1,
					"fontname" : "Verdana",
					"fontsize" : 14.0,
					"id" : "obj-14",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 493.0, 86.0, 440.0, 24.0 ],
					"text" : "The Player"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"fontname" : "Verdana",
					"fontsize" : 14.0,
					"id" : "obj-11",
					"linecount" : 22,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 9.0, 190.0, 446.0, 398.0 ],
					"presentation_linecount" : 22,
					"text" : "Training Mode\n\nYou can pre-train the listener to identify musical gestures (distinct playing styles or techniques).\n\nRecord a gesture into a buffer, add a new buffer for each gesture. then click train.\n\n\nPlay Mode\n\nOnce you have several training examples, enable play mode.\nIn play mode, the listener will listen for new input, and determine which pre-trained gesture it is most similar to. \n\nYou may want to train a \"silence\" gesture so the patch can won't try to classify your silence as something else\n\n\n\n\n\n"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"fontname" : "Verdana",
					"fontsize" : 14.0,
					"id" : "obj-7",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 9.0, 112.0, 446.0, 58.0 ],
					"presentation_linecount" : 4,
					"text" : "is a module that analyzes live input  of an instrument or voice\n\nthe input signal is a controller for the synthesizer"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"fontface" : 1,
					"fontname" : "Verdana",
					"fontsize" : 14.0,
					"id" : "obj-6",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 8.0, 86.0, 440.0, 24.0 ],
					"text" : "The Listener "
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"fontname" : "Verdana",
					"fontsize" : 14.0,
					"id" : "obj-2",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 8.0, 9.0, 393.0, 41.0 ],
					"text" : "this is a software instrument that listens to a performer and creates live improvised accompaniment"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [  ],
		"autosave" : 0,
		"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
		"bgcolor" : [ 0.258823529411765, 0.262745098039216, 0.266666666666667, 1.0 ],
		"editing_bgcolor" : [ 0.311041, 0.314599, 0.318357, 1.0 ],
		"stripecolor" : [ 0.23921568627451, 0.23921568627451, 0.23921568627451, 1.0 ]
	}

}
