const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unale to append to server.log');
    }
  });
  next();
});

// Maintenance redirect
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear().toString();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to mi casa.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  var errorMessage = 'Oh My';
  res.send(
    {title: 'We Bad',
    descrip: 'like really really bad',
    ErrorMessage: `${errorMessage}`
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    welcomeMessage: 'These are my projects'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});