const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    // The `host` parameter is required for other databases
    // host: 'localhost'
    dialect: 'sqlite',
    storage: './database.sqlite'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const Note = sequelize.define('notes', { note: Sequelize.TEXT, tag: Sequelize.STRING });
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);

    Note.bulkCreate([
      { note: 'pick up some bread after work', tag: 'shopping' },
      { note: 'remember to write up meeting notes', tag: 'work' },
      { note: 'learn how to use node orm', tag: 'work' }
    ]).then(function() {
      return Note.findAll();
    }).then(function(notes) {
      console.log(notes);
    });
  });

app.use(express.json());

app.get('/', (req, res) => res.send('Notes App'));
app.get('/notes', (req, res) => Note.findAll().then(notes => res.json(notes)));
app.get('/notes/:id', (req, res) => Note.findAll({ where: { id: req.params.id } }).then(notes => res.json(notes)));

app.post('/notes', (req, res) => Note.create({ note: req.body.note, tag: req.body.tag }).then(note => res.json(note)));

app.put('/notes/:id', (req, res) => {
  Note.findByPk(req.params.id).then(note => {
    note.update({
      note: req.body.note,
      tag: req.body.tag
    }).then(note => {
      res.json(note);
    });
  });
});

app.delete('/notes/:id', (req, res) => {
  Note.findByPk(req.params.id).then(note => {
    note.destroy();
  }).then(note => {
    res.sendStatus(200);
  })
});

app.listen(8080, () => {
    console.log("Server start in port 8080");
})