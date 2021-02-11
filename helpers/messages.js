const emoji = require('node-emoji');
require('colors');

const showMenu = () => {

    return new Promise( resolve => {
        console.clear();
        console.log('============================='.grey);
        console.log('   Select an option'.green);
        console.log('=============================\n'.grey);
        console.log(`1. ${'Create task'.green} ${ emoji.get('pencil2') } ` );
        console.log(`2. ${'List task'.green} ${ emoji.get('coffee') } ` );
        console.log(`3. ${'List task completed'.green} ${ emoji.get('comet') } ` );
        console.log(`4. ${'Pending tasks'.green} ${ emoji.get('watch') } ` );
        console.log(`5. ${'Complete task'.green} ${ emoji.get('heavy_check_mark') } ` );
        console.log(`6. ${'Delete task'.green} ${ emoji.get('x') } ` );
        console.log(`0. ${'Exit'.green} ${ emoji.get('anchor') } ` );

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Select an option: ', ( option ) => {
            resolve( option );
            readLine.close();
        } );
    });
};

const pause = () => {

    return new Promise ( resolve => {

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question( `\nPress ${ 'ENTER'.blue } to continue` , ( option ) => {
            resolve( option );
            readLine.close();
        } );

    });
};

module.exports = {
    showMenu,
    pause
};