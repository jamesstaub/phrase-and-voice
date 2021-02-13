# timbral-temporal-modelling
this is a max msp project for live performance 

This is a realtime interactive performance tool for slicing up and triggering audio samples (either pre-loaded or recorded on the fly)based on audio descriptors such as MFCC, Chroma, Fundamental Frequency and Spectral Flux. 
Built with the [MUBU for Max](http://ismm.ircam.fr/mubu/) package and heavily based on the work and examples of the MUBU project.

It's under active development so features are still being completed and is not yet very user friendly.

# getting started
## requirements
- Max 8
- MUBU for Max (available via package manager) 


Open `performance.maxpat`



# performance scenarios

## realtime input triggers sounds from corpus
when in `onset-knn` mode, the audio segment played by `mubu.concat~` is selected by  by K nearest neighbor (`mubu.knn`), which is triggered by  the `InputDescriptors` patch.

1.  load several short sound files (between 5 sec - 1 min) into the player module and analyze them (corpus), creating a buffer of beat-segmented audio with the descriptors listed above. 
2. select playback mode `onset-knn`
3. set input mode in player to input (stream-knn is in menu but not working yet )
4. sound coming through the ADC inputs will be analyzed in real time and trigger segments in the player.

Audio recorded to the TemporalModel's buffer can also be loaded into the Player's buffer by selecting temporalmodel from the `source` tabs in the Player patch. 


## 
Recordings  When the temporal model patch is playing, it output's it's own audio descriptors to the Player's K


1. record a temporal model (ensure analysis is on before recording )
2. set input mode in player to temporal model

### live input controlling player

use the sliders in `KNN WEIGHTS` panel to set the priority for the KNN matching. preset 1 is for matching tonality and register of pitched sounds. preset 2 is for matching timbre of any sound. 

# modules


## timbral model
use MUBU's gaussian mixture models to record and analyze a distinct timbre on each MUBU buffer. see mubu.gmm helpfile for more info. 
for my performance use cases I am training a model on different articulations of upright bass (plucked, bowed, harmonics, percussion etc)

1. `record` 10-30 seconds of a distinct timbre, then stop recording. 
2. `+` add another buffer
3. `record` a second timbre, stop recording. (
4. keep adding and recorind buffers, keep buffers as unique as possible for good results.
5. after done recording press train.
6. press play to analyze input signal, outputting a the buffer number of the closest matching timbre. 

## Octatrack as external controller
The performance patch is meant to model playback of a corpus to match an input signal. The top-level preset object is mapped to the midi program events of the Pattern/Bank of the Octatrack.

If a Timbre model is being used, the `timbre_id ` of the input signal will be sent out as midi to the octatrack to control the current scene and position of the crossfader.

The input of the crossfader midi from the octatrack can then be mapped to different parameters or presets. The goal of this setup is that the max patch presets can be easily programmed on the fly in sync with an octatrack performance project.


## temporal model
A pre-recorded temporal model can be configured to either trigger segments from the corpus, or to apply synthesis playback parameters to segments that are triggered by the live input.

The temporal model gets recorded in another patch (see temporalmodel-sketch), then javascripts are run to create columns in the TM mubu container correspondign to parameters of the mubu.concat synth object. The analysis of the audio recorded into the TM gets mapped into synthesis parameters.

For example, the loudness descriptor of audio recorded into the TM gets mapped into a timeseries of the "level" parameter, which gets segmented and then applied to the concat synth  when triggered inside the poly voice.
 



## player
patcher containing mubu.concat~ which has multiple playback modes.

1. select source `corpus`
2. load audio files
3. click `analyze`
4. select playback mode


**TO DO**
- add granular conrol modes
- smart gain adjustment 
- for knn playback mode:
  -  add configurations for knn lookup of realtime input stream vs on onset (current default behavior)
  - 
- A plugin pattern for subpatchers that can be loaded on the fly and triggered by the node script.




# Contributing
Feel free to make a PR with improvements or ask a question via issues. 



