require('colors');

// const { showMenu, pause } =require('./helpers/messages');
const argv = require('./config/yargs');
const { inquirerMenu, 
        pause, 
        readInput,
        deleteMenu, 
        confirm,
        checkListMenu 
} = require('./helpers/inquirer');
const { save, readDB, dropAll } = require('./helpers/dbOperations');
const Tasks = require('./models/tasks');


const main = async() => {
   
    if ( argv.c ) dropAll();

    let selected = '';

    // Model instance
    const tasks = new Tasks();

    // Load task if exist someone.
    const taskStored = readDB();

    if ( taskStored ) {
        tasks.loadTasksFromArray( taskStored );
    }


    do {
        // optionSelect = await showMenu();
        selected = await inquirerMenu();

        switch ( selected ) {
            case '1':
                const inputText = await readInput('Description:');
                tasks.create( inputText );
                break;
        
            case '2':
                tasks.showList();
                break;

            case '3':
                    tasks.showCompleted( true );
                    break;

            case '4':
                    tasks.showCompleted( false );
                    break;

            case '5':
                    if ( tasks.arrayList.length !== 0 ) {
                        const ids = await checkListMenu( tasks.arrayList );
                        tasks.toggleCompleted( ids );
                    } else {
                        console.log('');
                        console.log('\n\n<< The list is empty >>'.grey);
                    }
                    break;

            case '6':
                    if ( tasks.arrayList.length !== 0 ) {
                        const id = await deleteMenu( tasks.arrayList );
    
                        if ( id !== '0' ) {
                            
                            const isValidate = await confirm( 'Are you sure?' );
                            
                            if ( isValidate ) {
                                tasks.delete( id );
                                console.log('\n\n<< Task deleted to list >>'.red );
                            }

                        }
                    } else {
                        console.log('');
                        console.log('\n<< The list is empty >>'.grey);
                    }
                    break;
        }

        
        if ( !argv.d ) save( tasks.arrayList );

        await pause();

    } while ( selected !== '0' );
    
};

main();