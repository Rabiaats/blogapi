"use strict";

const mongoose = require("mongoose");

const passwordEncrypt = require('../helpers/passwordEncrypt');
/* ------------------------------------------------------- */

// User Schema:

const UserSchema = new mongoose.Schema({

    email:{
        type:String,
        trim:true,
        unique:true,
        required: [true, 'Email is required'],
        
        validate: {
            validator: (email) => {
                return email.includes('@') && email.includes(".")
            },
            message: 'Email format is incorrect'
        }

    },

    password:{
        type:String,
        trim:true,
        required: [true, 'Password is required'],
        set: (password) => passwordEncrypt(password),
    },

    firstname:String,

    lastname:String,

}, {
    collection: 'users',
    timestamps: true
})

module.exports = {
    User: mongoose.model('User', UserSchema)
}
