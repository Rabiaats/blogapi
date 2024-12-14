"use strict";

// Call Models:
const {BlogCategory} = require('../models/blogCategory.model')
const { NotFoundError, CustomError } = require("../errors/customError");

module.exports.blogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
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
    const result = await BlogCategory.findOne({_id: req.params.categoryId},{_id:0, name: 1}) 
    if (!result) {
      throw new NotFoundError("No matching documents found");
    }

    res.send(result)
  },

  update: async (req, res) => {
    
    const result = await BlogCategory.updateOne({_id: req.params.categoryId},req.body)

    if(result.matchedCount === 0){
    
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
    
    if(result.deletedCount === 0){
      throw new NotFoundError("No matching documents found");
      
    }

    res.send(result)
  },
};
