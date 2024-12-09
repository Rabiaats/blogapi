"use strict";
const { timeStamp } = require("console");
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Mongoose:

const mongoose = require("mongoose");
//^ shema olusturacagiz mongoose den

/* ------------------------------------------------------- 

const user = {
    'firstname': 'John'
}

const ModelSchema = new mongoose.Schema({
    
    fieldName: String,   
    * Type shorthand

    fieldName1: {
        
        type: Number,
        
        default: 4,
        ^ required true yapmazsak yani zorunlu doldurma eklemezsek veri gelmezse 4 olur
        
        trim: true,
        ^ basindaki sonundaki bosluklari kirpar

        unique: true,

        required: [true, 'This field is required'],
        
        enum: [['John', 'Bruce'], 'Bu degerlerden biri olmali'],
        ^ bunlardan baska deger alamaz

        validate: [() => true, 'Uyumsuz veri tipi'],

        get: (data) => data,
        set: (data) => data,

        index: true 
        ^ hizli erisim, siklikla kullanilanlar-cabuk erisim
    }
}, {
    collection: 'tabloName',
    timestamps: true 
    * otomatik createdAt, updatedAt
})

const ModelName = mongoose.model('ModelName', ModelSchema);

module.exports = {ModelName};
/* ------------------------------------------------------- */
// BlogCategory Schema:
//! erd - diyagramlardan bakarak yaptik

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