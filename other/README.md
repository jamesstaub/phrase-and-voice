# timbral-temporal-modelling
this is a max msp projectfor live performance built with the MUBU package.

this project is under active development and thus is not yet very user friendly.

This is a realtime interactive performance tool for slicing up and triggering audio samples (either pre-loaded or recorded on the fly) based on audio descriptors such as MFCC, Chroma, Fundamental Frequency and Spectral Flux.

# getting started
## requirements
- MUBU 
- Jamoma
- Max8 (for node4max script)
(both available via package manager)

Open index.maxpat in Max MSP to see all modules, or open performance_1.maxpat (which loads performance_1.js) for a work in progress version of a live performance setup.

`code/performance_1.js` code is meant for my specific performance context but the patterns could be abstracted for other use cases. this node script takes messages from the timbral model (GMM classification of live input) and an on/off signal from the noisegate. The script then triggers various playback parameters based on those inputs.


## live input analysis
input signal is analyzed for mfcc and chroma and onset (see MUBU library's pipo and mubu.process help files for explainatiom of these descriptors)

The input signal can be recorded by the timbral model and temporal model patches, or used to trigger audio segments in the player patch. 

1. set the noisegate threshold so room noise does not pass through.
2. ensure `run` is selected to send signal to other patches.



## timbral model
use MUBU's gaussian mixture models to record and analyze a distinct timbre on each MUBU buffer. see mubu.gmm helpfile for more info. 
for my performance use cases I am training a model on different articulations of upright bass (plucked, bowed, harmonics, percussion etc)

1. `record` 10-30 seconds of a distinct timbre, then stop recording. 
2. `+` add another buffer
3. `record` a second timbre, stop recording. (
4. keep adding and recorind buffers, keep buffers as unique as possible for good results.
5. after done recording press train.
6. press play to analyze input signal, outputting a the buffer number of the closest matching timbre. 



## temporal model
(very work in progress)

1. `record` musical phrases, along with input analysis data.
2. `play` to send ircamdescriptors to the player (which can be used to trigger new samples with KNN)
(see pipo~ help file for description of ircamdescriptors)

## concatenative synth (aka player)
patcher containing mubu.concat~ which has multiple playback modes.

1. select source `corpus`
2. load audio files
3. click `analyze`
4. select playback mode

or
1. select source `temporalmodel`
2. record temporal model (see above)
3. select playback mode

### live input controlling player
when in `onset-knn` mode, the audio segment played by `mubu.concat~` is selected by  by K nearest neighbor (`mubu.knn`), which is triggered by either the `live input analysis` patch or the temporal model patch (if has recorded buffers and is set to `play`)

use the sliders in `KNN WEIGHTS` panel to set the priority for the KNN matching. preset 1 is for matching tonality and register of pitched sounds. preset 2 is for matching timbre of any sound. 



# Contributing
Feel free to make a PR with improvements or ask a question via issues. 



