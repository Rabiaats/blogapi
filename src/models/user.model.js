"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Mongoose:

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
        
        //! 1 -> anlamsiz hata mesaji gelir mongoose den
        // validate: (email) => email.includes('@') && email.includes(".")

        // validate: (email) => {
        //     console.log('this', this)
        // } //! -> this bos obje 

        //! 2 -> biz kendi hata mesajimizi yazdik
        // validate: [(email) => {
        //     return email.includes('@') && email.includes(".")
        // }, 'Email format is incorrect']

        //! 3
        validate: {
            validator: (email) => {
                return email.includes('@') && email.includes(".")
            },
            message: 'Email format is incorrect'
        }

        //! 4
        // validate: {
        //     validator: function(email){
        //         // console.log('this', this) //! -> UserShema objesini doner 
        //         return email.includes('@') && email.includes(".")
        //     },
        //     message: 'Email format is incorrect'
        // }
    },

    password:{
        type:String,
        trim:true,
        required: [true, 'Password is required'],
        set: (password) => passwordEncrypt(password),
        // set:passwordEncrypt -> fonksiyonun adresini pointer ediyor -> password u bu referansa gonderiyor

        // validate: [function(password) {
        //     if(password.length < 8) return false;
        //     else{ 
                //! bu yontem tercih edilmez cunku burasi validate yapar set islemi buraya ait degildir
        //         const hash = passwordEncrypt(password)
        //         this.password = hash;
        //         return true;
        //     }
        // }, 'Email format is incorrect']
        //! 8 den az karakterli yazdik kabul etti cunku ilk olarak set ettiginden password hash lenmis olarak geldi yani uzun o yuzden kabul etti
        //^ set i burada yapip validate i disarida yapabiliriz
        //^ ikisini de controllerda yapabiliriz
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

//! erd den bakarak model i olustur

//^ ek paket -> sifreli password -> bcrypt paketi -> async -> bcrypt.gwnSalt()

//^ built-in ile -> candidatePassword

//^ built-in ile -> require('node:crypto') -> crypto.pbkdf2Sync(password, salt(process.env.SECRET_KEY), iterations(kac kere donsun), keyLength(kac byte lik olsun-password uzunlugu), encType('sha512' -> daha guvenli veri uretir->64bit te calisir -> algoritma tipi)).toString('hex')

//* .pbkdf2Sync() -> buffer tipinde uretir -> RAM de belirli bir yer alip yazar