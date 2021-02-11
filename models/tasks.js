const Task = require("./task");
const emoji = require('node-emoji');

class Tasks {

    _list = new Object();

    get arrayList() {

        const arrayTask = [];

        Object.keys( this._list ).forEach( key => {
            arrayTask.push( this._list[key] );
        });

        return arrayTask;
    }


    constructor() {
        this._list = {};
    }

    create( desc = '' ) {
        
        const task = new Task( desc );
        this._list[task.id] = task;

        console.log('\n<< Task added to list >>'.green);
    }

    delete( id = '' ) {
        if ( this._list[id] ) {

            delete this._list[id];

        }
    }

    loadTasksFromArray( tasks = [] ) {
        // this._list = tasks;

        tasks.forEach( task => {
            this._list[ task.id ] = task;
        });
    }
    
    showList( ) {


        console.log('');

        this.arrayList.forEach( ( task, index ) => {

            const { desc, dateCompleted } = task;
            const idx = `${ index + 1 }.`.blue;
            const state = ( dateCompleted ) ? emoji.get('heavy_check_mark')
                                            : emoji.get('x');

            console.log(`|${ state }| ${ idx } ${ desc }`);

        });

        if ( this.arrayList ) console.log('\n<< The list is empty >>'.grey);
    };

    showCompleted( isComplete = true ) {

        console.log('');
        let count = 0;

        this.arrayList.forEach( task => {

            const { desc, dateCompleted } = task;
            const state = ( dateCompleted ) ? emoji.get('heavy_check_mark')
                                            : emoji.get('x');
                                        
            if ( isComplete ) {

                if ( dateCompleted ) {
                    count += 1;
                    console.log(`|${ state }| ${ count.toString().blue }. ${ desc } :: ${ dateCompleted.green }`);
                }

            } else {
                
                if ( !dateCompleted ) {
                    count += 1;
                    console.log(`|${ state }| ${ count.toString().blue }. ${ desc }`);
                }
            }
        });

        if ( count === 0 ) console.log('\n<< The list is empty >>'.grey);
    };

    toggleCompleted( ids = [] ) {

        ids.forEach( id => {

            const task = this._list[id];

            if ( !task.dateCompleted ) {
                task.dateCompleted = new Date().toISOString();
                
            }
        });

        this.arrayList.forEach( task => {

            if ( !ids .includes( task.id) ){

                this._list[task.id].dateCompleted = null;
            }
        });

    } 
}


module.exports = Tasks;