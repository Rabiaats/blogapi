//^ collection -> document -> field 

//* odm(object document mapping) -> seviyeyi yukseltir -> konusma diline daha yakin

//? veritabani sorgularini basitlestirir, yuksek seviyeli API, CRUD, hata yonetimi-dogrulama-steril(sizmalari onlemek) otomatik olarak yapar

// farkli tablolardaki ilislikili veriler populate yontemiyle doldurulur -> inner join 

// middleware(ara yazilim)-plugin(paket)

//^ mongoose -> semaya gore veri dogrulama-donusturme islemlerini yapar
//*-> MongoDB ye veri gonderirken Mongoose verileri JS nesnelerindan BSON a donusturur

// mongoose paketini yukleriz -> npm i mongoose 

//! commonjs ->> cache den getiriyor -> her seferinde paket eklemeye gerek yok

//^ sema(scheme) -> MongoDB collection daki (tablo) belgelerin yapisini tanimlayan sablon
// -> belgelerin seklinin nasil olmasi gerektigini belirtir-veri dogrulama(validation) kurallarini saglar
// boolean number objectId string -> en cok kullancagimiz types 

//! objectId -> 24 karakterli hexadecimal

//^ model -> semaya dayali olusturulan, collection ile iletisim kuran arayuz

/*
let mongoose = require('mongoose');
let validator = require('validator'); // express validator kullanabiliriz

let emailSchema = new mongoose.Shema({ //* sema
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    }
})

module.exports = mongoose.model('Email', emailSchema) //* model
*/

//! dbconnection -> model -> controller -> router

//! MERN