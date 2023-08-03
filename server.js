
require('dotenv').config();
const session = require('express-session');
const expresshandle = require('express-handlebars');
const express = require('express');
const { join } = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');
app.use(require('./controllers'));

const SeqStore = require('connect-session-sequelize')(session.Store)
const handleBars = expresshandle.create({})

app.use(session({
  secret: '',
  cookie: {
    maxAge: 100000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }
  saveUnitialized: true,
  resave: false,
  store: new SeqStore({
    db: sequelize
  })
}));

sequelize.sync({ force: false })
app.listen(3001);