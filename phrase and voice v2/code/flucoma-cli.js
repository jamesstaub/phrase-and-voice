
var exec = require('child_process').exec;
const fs = require( 'fs' );
const path = require( 'path' );

const [directory] = process.argv.slice(2)

const flucomaProcess = (directory, file) => {
    const filePath = path.join( directory, file )
    // const [fp, ext] = filePath.split('.');
    const cmd = `/Users/admin/FluidCorpusManipulation/bin/fluid-hpss -source ${filePath} -harmonic ${directory}harmonic/${file} -percussive ${directory}percussive/${file}`
 	console.log(cmd);
    dir = exec(cmd, function(err, stdout, stderr) {
        if (err) {
            console.log('ERROR:', err);
          // should have err.code here?  
        }
        
      });
      
      dir.on('exit', function (code) {
        // exit code is code
        console.log('EXIT', code);
      });
}

(async ()=>{
    const cmd = `rm -rf ${directory}/harmonic && rm -rf ${directory}/percussive && mkdir ${directory}/harmonic && mkdir ${directory}/percussive`
    exec(cmd);

    try {
        // Get the files as an array

        const files = await fs.promises.readdir( directory );

        // Loop them all with the new for...of
        for( const file of files ) {
            // Get the full paths
            const filePath = path.join( directory, file );
            // Stat the file to see if we have a file or dir
            const stat = await fs.promises.stat( filePath );

            if( stat.isFile() ) {
                flucomaProcess(directory, file)
            }
        } 
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "THROW", e );
    }

})(); // Wrap in parenthesis and call now
