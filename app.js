const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

var todos = [];

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Lista de TODOS',
    todos
  });
});

app.delete('/todos/:id', function (req, res) {
  todos = todos.filter((todo) => todo.descricao !== req.params.id);

  res.render('index', {
    title: 'Lista de TODOS', todos
  });
});

app.get('/todos/add', function (req, res) {
  res.render('add_todo', {
    title: 'Novo TODO'
  });
});

app.post('/todos/add', function (req, res) {
  descricao = req.body.todo;
  id = Math.random();
  todos.push({ descricao, id });
  res.render('index', {
    title: 'Lista de TODOS', todos
  });
});

app.listen(3000, function () {
  console.log('server started on port 3000')
})