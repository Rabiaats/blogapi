'use strict'

// Middleware: User check from session

const { User } = require("../models/user.model");
//! her route oncesi bu middleware calisir
module.exports = async (req, res, next) => {

  req.user = null;
  
  if(req.session?._id){ // login olmus mu

    const {_id, password} = req.session;

    const user = await User.findOne({_id});

    if(user && user.password == password){
      // login basarili
      // session icindeki login datasi basarili ise user verisini req.user a ata
      //! her yerden erismek icin req.user yaptik
      req.user = user;

    }else{ // user veritabaninda yoksa ya da user.password u sessiondaki password ile uyusmuyorsa eski bilgilerdir onlari temizle
      req.session = null;
      req.user = null;
    }

  }
  
  next()
}
