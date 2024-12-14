"use strict";
// Call Models:
const {BlogPost} = require('../models/blogPost.model')
const {CustomError} = require('../errors/customError')

module.exports.blogPost = {
  list: async (req, res) => {

    const data = await res.getModelList(BlogPost, ['userId', 'categoryId'])

    res.send({
      isError: false,
      details: await res.getModelListDetails(BlogPost),
      result: data
    });
  },

  // CRUD ->

  create: async (req, res) => {
    
    if(req.user) req.body.userId = req.user._id;

    const result = await BlogPost.create(req.body)
    res.send(result)
  },

  read: async (req, res) => {
    const result = await BlogPost.findOne({_id: req.params.postId},{_id:0, name: 1}) 

    res.send(result)
  },

  update: async (req, res) => {
    const result = await BlogPost.updateOne({_id: req.params.postId},req.body)

    if(result.matchedCount === 0){
      throw new CustomError('No matching documents found', 404)
    }

    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(204).send({ message: "Document already up-to-date." });
    }

    res.send({
      isError: false,
      result,
      updated: await BlogPost.FindOne({_id: req.params.postId})
    })

  },

  delete: async (req, res) => {
    const result = await BlogPost.deleteOne({_id: req.params.postId});
    
    if(result.deletedCount === 0){
      return res.status(404).send('No matching documents found')
    }

    res.send(result)
  },
};
