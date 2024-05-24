/*** import module ***/
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();

/*** import local module ***/
const connectDB = require('./config/db');
const configSite = require('./config/site');

const app = express();

connectDB();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    })
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(function (req, res, next) {
  req.auth = req.session.auth;
  res.locals = {
    ...{ auth: req.session.auth },
    ...configSite
  };
  next();
});

app.use('/', require('./routes/web'));
app.use('/api', require('./routes/api'));

/** catch 404 page **/
app.use(function (req, res, next) {
  res.status(404).render('errors/404', { title: 'Halaman tidak di temukan!' });
});

module.exports = app;