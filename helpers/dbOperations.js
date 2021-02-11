const fs = require('fs');

const file ='./db/data.json';

const save = ( data ) => {

    fs.writeFileSync( file, JSON.stringify(data) );
};

const readDB = () => {
    
    if ( !fs.existsSync( file )) {
        return null;
    }

    const aux = fs.readFileSync( file, { encoding: 'utf-8'} );
    const data = JSON.parse( aux );

    return data;
};

dropAll = () => {

    if ( !fs.existsSync( file )) {
        return null;
    }

    fs.unlinkSync( file );

};

module.exports = {
    save,
    readDB,
    dropAll
}