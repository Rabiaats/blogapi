"use strict";

const express = require("express");
// Catch error from async:
require("express-async-errors");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Accept JSON:
app.use(express.json());

// DB CONNECTION with normal function
require('./src/config/dbConnection')();

// DB CONNECTION with with class

/* ------------------------------------------------------- */
//^ SESSIONS & COOKIE  ->  npm i cookie-session

const session = require('cookie-session');

app.use(session({
  secret: process.env.SECRET_KEY, 
}));

/* ------------------------------------------------------- */
//^Check user-data from session
app.use(require('./src/middlewares/userControl'))
/* ------------------------------------------------------- */
// Middleware: Filter Search Sort Pagination

app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- */

//^ route handler

/* ------------------------------------------------------- */
// Routes:
app.use('/blog/category', require('./src/routes/blogCatagory.router'))

app.use('/blog/post', require('./src/routes/blogPost.router'))

app.use('/user', require('./src/routes/user.router'))

app.use('/auth', require('./src/routes/auth.router'))

app.all("/", (req, res) => {

  res.send({
    message: 'Welcome to blog api',
    user: req.user, 
    session: req.session
  })
});
/* ------------------------------------------------------- */
app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The route is NOT FOUND" });
});

// Catch Errors:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));


// require('./sync')()