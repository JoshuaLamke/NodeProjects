const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }

    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler: () => {
        notes.listNotes()
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'read a notes contents',
    builder: {
        title: {
            describe: 'Title of note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})

//add, remove, read, list
yargs.parse()
