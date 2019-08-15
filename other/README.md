# timbral-temporal-modelling
max msp project built with MUBU for live performance 
this project is under active development and thus is not yet very user friendly.

This is a realtime interactive performance tool for slicing up and triggering audio samples (either pre-loaded or recorded on the fly) based on audio descriptors such as MFCC, Chroma, Fundamental Frequency and Spectral Flux.

# getting started
Open index.maxpat in Max MSP to see all module or open performance_1.maxpat (which loads performance_1.js) for work in progress version of a live performance setup.

This code is meant for my specific performance context but the patterns could be abstracted for other use cases

## live input analysis
input source is analyzed for mfcc and chroma and onseg (see MUBU library's pipo and mubu.process help files for explainatiom of these descriptors)

## timbral model
use MUBU's gaussian mixture models to record and analyze a distinct timbre on each MUBU buffer. see mubu.gmm helpfile for more info. 
for my performance use cases I am training a model on different articulations of upright bass (plucked, bowed, harmonics, percussion etc)

## temporal model
record musical phrases, play to send ircamdescriptors to the player (which can be used to trigger new samples with KNN)

## concatenative synth (aka player)

can be triggered by KNN lookup of chroma descriptors sent by temporal model or live input.
player's audio source can either be the temporal model's MUBU buffer, or the corpus MUBU buffer, which is loaded by drag and dropping audio files into the patch.


