const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title already taken!'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title === title)
    if(filteredNotes.length !== notes.length){
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse('Removed note!'))
    }else{
        console.log(chalk.red.inverse('A note with that title does not exist.'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue('Your Notes:\n'))
    notes.forEach((note) => {
        console.log(chalk.green(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToBeRead = notes.find((note) => note.title === title)
    if(noteToBeRead){
        console.log(`Title: ${chalk.italic.blue(noteToBeRead.title)}\nBody: ${chalk.green(noteToBeRead.body)}`)
    }else{
        console.log(chalk.red(`There is no note with the title "${title}".`))
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}
module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}