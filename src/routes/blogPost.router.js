"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

// Call Controllers:
const {blogPost} = require('../controllers/blogPost.controller')

//* blog/post
//* /blog/post/id
/* ------------------------------------------------------- */

// URL: /blog ->
// BlogPost

router.route('/')
    .get(blogPost.list)
    .post(blogPost.create);

router.route('/:postId')
    .get(blogPost.read)
    .put(blogPost.update)
    .patch(blogPost.update)
    .delete(blogPost.delete)

// BlogPost

module.exports = router

//! mongoose - middleware -> methodlari 
//! populate -> post userId tutar -> populate ile userId ile esleysen user bilgilerini getiririz 