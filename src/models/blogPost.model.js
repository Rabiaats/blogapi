"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Mongoose:

const mongoose = require("mongoose");

/* ------------------------------------------------------- */

// BlogPost Schema:

const BlogPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
        //^ blogCategories tablosu ile bagladik
        required: true,
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    published: {
        type: Boolean,
        default: true
    }

}, {
    collection: 'blogPost',
    timeStamp: true
})

module.exports = {
    BlogPost: mongoose.model('BlogPost', BlogPostSchema)
}

//! ODM mongodb deki veri ile benim elimdeki veri etkilesimde
// sema olusturuyoruz -> modele gore gelen veri turlerini mongodb ye kaydediyoruz

// user name-email tanimliyoruz sema da -> buna gore model bu semaya gore calisiyor -> bu semaya bakip calisiyor