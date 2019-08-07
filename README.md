# timbral-temporal-modelling
max msp project built with MUBU for live performance 

# getting started
Open index.maxpat in Max MSP

## live input analysis
input source is analyzed for mfcc and chroma

## timbral model
record and analyze a distinct timbre on each MUBU buffer, then click play and the model will predict new input based on similarity to recorded bufferes

## temporal model
record musical phrases, play to send Chroma descriptors to the player (which can be used to trigger new samples with KNN 

## concatenative synth

can be triggered by KNN lookup of chroma descriptors sent by  temporal model or live input 
