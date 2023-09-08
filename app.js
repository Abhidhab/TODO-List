const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Use EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory task list (for demonstration purposes)
let tasks = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.get('/work', (req, res) => {
  res.render('work', { tasks });
})


app.post('/add', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect('/');
});

app.post('/complete/:index', (req, res) => {
  const index = req.params.index;
  tasks[index] = `[DONE  ✅ ] ${tasks[index]}`;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});