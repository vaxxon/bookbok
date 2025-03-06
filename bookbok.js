// framework setup

const express = require('express'); // import express
const cookieParser = require('cookie-parser') // before the express session!
const expressSession = require('express-session') // after the cookie parser!
const { credentials } = require('./config') // import config file
const handlebars = require('express-handlebars').create({ // create handlebars object
    helpers: {
      eq: (v1, v2) => v1 == v2,
      ne: (v1, v2) => v1 != v2,
      lt: (v1, v2) => v1 < v2,
      gt: (v1, v2) => v1 > v2,
      lte: (v1, v2) => v1 <= v2,
      gte: (v1, v2) => v1 >= v2,
      and() {
          return Array.prototype.every.call(arguments, Boolean);
      },
      or() {
          return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      },
      someId: (arr, id) => arr && arr.some(obj => obj.id == id),
      in: (arr, obj) => arr && arr.some(val => val == obj),
      dateStr: (v) => v && v.toLocaleDateString("en-US")
    }
  });
const bodyParser = require('body-parser')

// import routers from routes folder
const indexRouter = require('./routes/index') 
const authorsRouter = require('./routes/authors')
const booksRouter = require('./routes/books')
const genresRouter = require('./routes/genres')

// application logic

const app = express(); // start express app
app.engine('handlebars', handlebars.engine) // register express as the template engine
app.set('view engine', 'handlebars') // same? idk
const port = 3000; // add a port, not one below 1000
app.use(bodyParser.urlencoded({extended: true})) // parse that body – before the view routers!
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // cookies expire after 30 days
}))

app.use("/", indexRouter) // route the index page to a view
app.use("/authors", authorsRouter) // route the authors/ directory to a view
app.use("/books", booksRouter) // route the books/ directory to a view
app.use("/genres", genresRouter) // route the genres/ directory to a view

// 404 handler
app.use((req, res) => {
    res.status(404);
    res.send('<h1 style="color:orange">404 – Not Found</h1>');
});

// 500 handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 – Server Error');
});

// start server message
app.listen(port, () => console.log(
    `Express started on localhost:${port}. `
    + "Press control-C to terminate."
))