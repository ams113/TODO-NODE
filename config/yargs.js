const argv = require('yargs')

.option('c', {
    alias: 'clean',
    type: 'boolean',
    default: false,
    desc: 'Start the app with the db without registers'
})
.option('d', {
    alias: 'dev',
    type: 'boolean',
    default: false,
    desc: 'No data persistence'
}).argv;

module.exports = argv;