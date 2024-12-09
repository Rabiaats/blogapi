"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const {BlogCategory} = require('../models/blogCategory.model')
const { NotFoundError, CustomError } = require("../errors/customError");

/* ------------------------------------------------------- */
// BlogCategory Controller:
// /blog/category -> list
module.exports.blogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find(); // find({}) -Z ({filter}, {projection})
    res.send({
      isError: false,
      result: data
    })
  },

  // CRUD ->

  create: async (req, res) => {
    const result = await BlogCategory.create(req.body)
    res.send(result)
  },

  read: async (req, res) => {
    const result = await BlogCategory.findOne({_id: req.params.categoryId},{_id:0, name: 1}) // sadece name gelir
    // findById ile yaparsak sadece unique _id ile yapar

    if (!result) {
      throw new NotFoundError("No matching documents found");
    }

    res.send(result)
  },

  update: async (req, res) => {
    // const result = BlogCategory.updateOne({_id: req.params.categoryId},{...req.body})
    //! find-findOne-findByIdAndUpdate  -> data dondurur
    //! updateOne -> bize sonuc hakkinda bilgi verir -> data dondurmez

    const result = await BlogCategory.updateOne({_id: req.params.categoryId},req.body)

    //^ matchedCount: 0 || 1 || 2 || ... -> güncellenmis data sayisi
    //^ modifiedCount = 0 || 1 -> guncellenmis variable sayisi

    //* istege bagli hata
    if(result.matchedCount === 0){
      // throw new CustomError('No matching documents found', 404) //^ genelde
      // throw new NotFoundError("No matching documents found");

      return res.status(404).send('No matching documents found')
    }

    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(204).send({ message: "Document already up-to-date." });
    }
    
    res.send({
      isError: false,
      result,
      updated: await BlogCategory.findOne({_id: req.params.categoryId})
    })

  },

  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({_id: req.params.categoryId});
    // deletedCount

    if(result.deletedCount === 0){
      // throw new CustomError('No matching documents found', 404)
      throw new NotFoundError("No matching documents found");
      
      // return res.status(404).send('No matching documents found')
    }

    res.send(result)
  },
};

/* ------------------------------------------------------- */
