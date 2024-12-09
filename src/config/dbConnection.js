"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");
const process = require("process");

//'mongodb://localhost:27017/blogAPI'
/*------------------------------------------------------ */
//! neden async -> 
//^ function
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
/*------------------------------------------------------
//^ class
class DatabaseConnection{
    constructor(){
        this.#_connect();
    }

    #_connect(){
        if(!process.env?.MONGODB_URI)
            throw new CustomError('MONGODB_URI is necessary')
        mongoose
            .connect(process.env?.MONGODB_URI)
            .then(() => {
                console.log('Database connection is succesfull')
            })
            .catch((error) => {
                console.log('Database connecction error')
            })
    }
}
/*------------------------------------------------------*/
module.exports = dbConnection;
// module.export = DatabaseConnection();
//! bir projeye baslarken yapilacak en onemli sey kurgusudur -> erd tablo diyagramlari -> drawSQL