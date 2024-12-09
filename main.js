"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require("express"); // require bir methodtur neyi getirmek istiyorsak icine onu alir
// Catch error from async:
require("express-async-errors"); // hosting ozelligi yok require nin
const app = express();
//^ singleton uygulama da tek bir express

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Accept JSON:
app.use(express.json());

// DB CONNECTION with normal function
require('./src/config/dbConnection')();

// DB CONNECTION with with class

/* ------------------------------------------------------- */
//^ SESSIONS & COOKIE  ->  npm i cookie-session
// session oncelikli calismasi icin route dan once
//* req ile calistigi icin controlle da req.session yaparak kullandik

const session = require('cookie-session');

//* session kullanacagim -> ayarlarim bunlar
app.use(session({
  // kaydetmeden once sifreler
  secret: process.env.SECRET_KEY, 
  // Cookie datasini sifreleme anahtari

  //! eger maxAge burada yazilirsa beni hatirla olsa da olmasa da 3 gun tutar burada yapmayacagiz -> controller da yapacagiz
  // maxAge: 1000 * 60 *60 * 24 * 3 
  // sureli saklanacak -> cookie -> milisaniye -> 3 gunluk bir omur 
}));

/* ------------------------------------------------------- */
//^Check user-data from session
//! middleware userControle tasidik
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
  // res.send("WELCOME TO BLOG API");

  //! session a kaydedip kaydetmedigimize bakmak icin
  // console.log(req.session); 

  res.send({
    message: 'Welcome to blog api',
    user: req.user, 
    //! user bilgilerini alabildik sessionda check ettik passwordlar uyustu aldik
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

/* ------------------------------------------------------- */

//^ test icin veri 1 kere ekleyip yoruma aliyoruz
// require('./sync')()
//! modellerin icerigini silip test user, test category ve 200 tane blogPost ekliyor