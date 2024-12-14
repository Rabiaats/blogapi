"use strict";

const mongoose = require("mongoose");

const BlogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, {
    collection: 'blogCategories',
    timeStamp: true
})

module.exports = {
    BlogCategory: mongoose.model('BlogCategory', BlogCategorySchema)
}