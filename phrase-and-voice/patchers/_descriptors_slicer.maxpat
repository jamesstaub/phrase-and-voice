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
		"rect" : [ 874.0, 79.0, 772.0, 912.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
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
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "float", "float", "float", "", "" ],
					"patching_rect" : [ 10.0, 97.0, 127.0, 22.0 ],
					"text" : "slice_ircamdescriptors"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 343.0, 106.0, 166.0, 87.0 ],
					"text" : "TODO make this configurable\n\nhook up gates and join different combinations of descriptors into single list\n"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 49.5, 6.0, 176.0, 20.0 ],
					"text" : "output of  pipo.ircamdescriptors"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 596.0, 395.5, 80.0, 22.0 ],
					"text" : "speedlim 200"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 596.0, 421.5, 32.0, 22.0 ],
					"text" : "ftom"
				}

			}
, 			{
				"box" : 				{
					"format" : 5,
					"id" : "obj-40",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 596.0, 451.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 7.5, 10.0, 81.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.113725490196078, 0.12156862745098, 0.117647058823529, 0.17 ],
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 651.0, 439.20001220703125, 139.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 115.5, 10.0, 139.0, 20.0 ],
					"text" : "Fundamental Frequency",
					"textcolor" : [ 0.862744987010956, 0.870588004589081, 0.878431022167206, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 651.0, 425.0, 224.0, 52.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 2.5, 254.0, 40.5 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "flux centroid mfcc joined for timbre model",
					"id" : "obj-2",
					"index" : 1,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 26.75, 571.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "ircamdescriptors",
					"id" : "obj-1",
					"index" : 1,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 6.0, 6.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 62.5, 544.0, 150.0, 33.0 ],
					"text" : "flux, centroid, mfcc to timbre model"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 26.5, 498.0, 47.0, 22.0 ],
					"text" : "pack f f"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 26.75, 536.5, 29.5, 22.0 ],
					"text" : "join"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.113725490196078, 0.12156862745098, 0.117647058823529, 0.17 ],
					"id" : "obj-102",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 360.5, 392.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 132.20001220703125, 54.0, 20.0 ],
					"text" : "Chroma",
					"textcolor" : [ 0.862744987010956, 0.870588004589081, 0.878431022167206, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.113725490196078, 0.12156862745098, 0.117647058823529, 0.17 ],
					"id" : "obj-101",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 154.5, 392.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 199.5, 46.20001220703125, 54.0, 20.0 ],
					"text" : "MFCC",
					"textcolor" : [ 0.862744987010956, 0.870588004589081, 0.878431022167206, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.113725490196078, 0.12156862745098, 0.117647058823529, 0.17 ],
					"id" : "obj-100",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 97.5, 392.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 205.5, 263.70001220703125, 54.0, 20.0 ],
					"text" : "Centroid",
					"textcolor" : [ 0.862744987010956, 0.870588004589081, 0.878431022167206, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.113725490196078, 0.12156862745098, 0.117647058823529, 0.17 ],
					"id" : "obj-99",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 60.5, 392.0, 31.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 223.5, 221.20001220703125, 31.0, 20.0 ],
					"text" : "Flux",
					"textcolor" : [ 0.862744987010956, 0.870588004589081, 0.878431022167206, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"candycane" : 8,
					"id" : "obj-78",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 154.5, 416.5, 202.5, 64.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 47.20001220703125, 254.0, 80.0 ],
					"setminmax" : [ -10.0, 10.0 ],
					"setstyle" : 1,
					"size" : 13
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 6.0, 60.0, 60.0, 22.0 ],
					"text" : "zl change"
				}

			}
, 			{
				"box" : 				{
					"candicane2" : [ 0.67843137254902, 0.76078431372549, 0.768627450980392, 1.0 ],
					"candycane" : 2,
					"id" : "obj-77",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 362.5, 416.5, 202.5, 64.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 133.20001220703125, 254.0, 80.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 11,
					"slidercolor" : [ 0.474509803921569, 0.537254901960784, 0.545098039215686, 0.99 ]
				}

			}
, 			{
				"box" : 				{
					"candicane2" : [ 0.67843137254902, 0.76078431372549, 0.768627450980392, 1.0 ],
					"candycane" : 8,
					"id" : "obj-103",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 60.5, 416.5, 29.5, 64.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 219.20001220703125, 256.0, 40.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"slidercolor" : [ 0.880169, 0.755396, 0.471904, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"candicane2" : [ 0.67843137254902, 0.76078431372549, 0.768627450980392, 1.0 ],
					"candycane" : 8,
					"id" : "obj-79",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 97.5, 416.5, 29.5, 64.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 264.20001220703125, 256.0, 40.0 ],
					"setminmax" : [ 0.0, 2000.0 ],
					"size" : 12,
					"slidercolor" : [ 0.880169, 0.755396, 0.471904, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 11.0,
					"id" : "obj-16",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 49.5, 28.0, 426.0, 19.0 ],
					"text" : "FundamentalFrequency PerceptualSpectralVariation SpectralCentroid MFCC Chroma"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-103", 0 ],
					"order" : 0,
					"source" : [ "obj-15", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 1 ],
					"order" : 1,
					"source" : [ "obj-15", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 1 ],
					"order" : 1,
					"source" : [ "obj-15", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"order" : 1,
					"source" : [ "obj-15", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"source" : [ "obj-15", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-78", 0 ],
					"order" : 0,
					"source" : [ "obj-15", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-79", 0 ],
					"order" : 0,
					"source" : [ "obj-15", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-40", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
 ],
		"styles" : [ 			{
				"name" : "AudioStatus_Menu",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
						"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "Jamoma_highlighted_orange",
				"default" : 				{
					"accentcolor" : [ 1.0, 0.5, 0.0, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
