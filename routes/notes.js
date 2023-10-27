const notes = require('express').Router();

const {readFromFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const {title, text} = req.body;
    console.log(req.body);
    
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        
        //const dbPath = path.join(__dirname, '../db/db.json');
        //readAndAppend(newNote, dbPath);
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('error in posting note');
    }
});

module.exports = notes;