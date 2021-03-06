const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://teste:teste123@ds131963.mlab.com:31963/teste');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('conectado com sucesso!');
});

// parse application/json
app.use(bodyParser.json());

let users = [];

app.post('/users', (req, res) => {
  users.push({
    nome: req.body.nome,
    email: req.body.email
  });
  res.send("cadastro concluido com sucesso!");
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const data = users.filter( (element) => {
    return element.email == req.params.id;
  });
  res.json(data);
});

app.put('/users/:id', (req, res) => {
  const data = users.map( (element) => {
    if(element.email == req.params.id){
      return req.body;
    }else{
      return element;
    }
  });
  users = data;
  res.send('Usuario alterado com sucesso!');
});

app.delete('/users/:id', (req, res) => {
  const data = users.filter( (element) => {
    return element.email != req.params.id;
  });
  users = data;
  res.send('Usuário deletado com sucesso');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))