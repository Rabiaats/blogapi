'use strict'

// Middleware: User check from session

const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {

  req.user = null;
  
  if(req.session?._id){

    const {_id, password} = req.session;

    const user = await User.findOne({_id});

    if(user && user.password == password){
      req.user = user;

    }else{
      req.session = null;
      req.user = null;
    }

  }
  
  next()
}
