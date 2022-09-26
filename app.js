const fs = require('fs');
const service = require('./services/service');
const credentials = require('./configs/user');
const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');
app.use(express.urlencoded({
  extended: true
}));

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/', (req, res) => {
  res.render('index', {
    locals: {
      textFile: 'This is the text'
    }
  });
});

app.post('/', (req, res) => {
  
});

app.listen(5000, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})
