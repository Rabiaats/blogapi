"use strict";
const { BadRequestError } = require('../errors/customError');
const passwordEncypt = require('../helpers/passwordEncrypt');
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const {User} = require('../models/user.model')
/* ------------------------------------------------------- */
// User Controller:
// /blog/category -> list
module.exports.user = {
  list: async (req, res) => {
    const data = await User.find(); 
    res.send({
      isError: false,
      result: data
    })
  },

  // CRUD ->

  create: async (req, res) => {

    if(!req.body.password || req.body.password.length < 8){
      throw new BadRequestError('Password must be 8 characters long')
    };

    //! eger if ten gecebilirse passwordu buradada set edebiliriz
    // req.body.password = paswordEncypt(req.body.password)

    const result = await User.create(req.body)
    res.send(result)
  },

  read: async (req, res) => {
    const result = await User.findOne({_id: req.params.userId},{_id:0, name: 1}) 
    res.send(result)
  },

  update: async (req, res) => {

    //! baska birisinin email i kullandigini soyluyoruz ya da daha onceden kaydolunmus
    if(req.body?.email){
      const email = await User.findOne({email: req.body.email})
      if(email){
        throw new BadRequestError('This email is already in use')
      }
    }

    const result = await User.updateOne({_id: req.params.userId},req.body, {
      runValidators: true
    })

    if(result.matchedCount === 0){
      return res.status(404).send('No matching documents found')
    }

    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(204).send({ message: "Document already up-to-date." });
    }
    
    res.send({
      isError: false,
      result,
      updated: await User.findOne({_id: req.params.userId})
    })

  },

  delete: async (req, res) => {
    const result = await User.deleteOne({_id: req.params.userId});
    if(result.deletedCount === 0){
      return res.status(404).send('No matching documents found')
    }

    res.send(result)
  },
};

/* ------------------------------------------------------- */
