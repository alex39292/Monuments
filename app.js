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

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  if (req.body.userName === credentials.userName & req.body.password === credentials.password) {
    res.render('admin');
  } else {
    res.render('index');
  }
});

app.listen(5000, () => {
    console.log(`App listening on port 5000`)
})
