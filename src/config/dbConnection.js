"use strict";

const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");
const process = require("process");

const dbConnection = () => {
    if(!process.env.MONGODB_URI){
        throw new CustomError('MONGODB_URI is necessary')
    }
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connection is succesfull')
    } catch (error) {
        console.log('Database connection error')
    }
}
module.exports = dbConnection;