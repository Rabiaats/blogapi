"use strict";

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