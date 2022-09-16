const { app, password } = require('./services/express/expess-config');
const renderHelper = require('./services/express/renderHelper');
const pg = require('./services/postgres/postgres');

let session;
pg.turnConnection();

app.route('/')
  .get((req, res) => {
    session = req.session;
    if (session.user) {
      res.render('admin');
    } else {
      res.render('login', {
        locals: {
          errorMessage: ''
        }
      });
    }
  })
  .post(async (req, res) => {
    if (req.session.user) {
      if (req.body.create) {
        res.render('create');
      }
      if (req.body.view) {
        await renderHelper.createView(req, res);
      }
      if (req.body.name && req.files) {
        await renderHelper.createUser(req, res);
      }
    } else if (req.body.password) {
      if (req.body.password === password) {
        session = req.session;
        session.user = req.body.password;
        res.render('admin');
      } else {
        res.render('login', {
        locals: {
          errorMessage: 'Неправильный пароль!'
        }});
      }
    } else {
      res.render('login', {
        locals: {
          errorMessage: 'Пожалуйста зарегистрируйтесь!'
        }});
    }
});

app.route('/:userId(\\w+\)')
.get(async (req, res) => {
  await renderHelper.renderUser(req, res);
});

app.listen(5000, () => {
    console.log(`App listening on port 5000`)
});
