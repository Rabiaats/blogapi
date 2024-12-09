"use strict";

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const { User } = require("../models/user.model");
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {
  login: async (req, res) => {

    console.log("login")
    const { email, password } = req.body;

    if (email && password) {
        // email ve password gonderildi

        const user = await User.findOne({email})

            if(user){
                // User Ok.
                // password kontrolu yapmaliyiz ama password sifreli -> kullanicinin gonderdigi parolayi sifreleyip o sekilde bakmaliyiz

                // user.password -> veritabanindaki sifre
                if(user.password == passwordEncrypt(password)){

                    //^ session
                    //! session burada -> kullanmazsak bu paketi islemler karmasik oluyor
                    // req.session = {
                    //     email: user.email,
                    //     password: user.password
                    // }
                    //* kaydettik bankendde cookie ye
                    // req.session.email = user.email
                    //! email kullanici ya ait onu acik etmeyelim
                    req.session._id = user._id;
                    req.session.password = user.password;
                    //! guvenlik ve az yeri oldugu icin sadece bunlari tuttuk 
                    //& ama biz user fotografini emailini .. kullanmak isteyebiliriz
                    //& user password degismisse session da tutulan da artik ise yaramiyor -> check user-data from session

                    //^ Cookie
                    if(req.body?.remindMe){
                        // beni hatirla varsa 
                        req.session.remindMe = true

                        req.sessionOptions.maxAge = 1000 * 60 *60 *24 * 3
                    }
                    //! son kullanma tarihi atar -> cookies

                    res.status(200).send({
                        error: false,
                        message: 'Login OK',
                        user
                    })

                }else {
                    res.errorStatusCode = 401
                    throw new Error('Login parameters are not true.')
                }
            }else {
                res.errorStatusCode = 401
                throw new Error('This user not found.')
            }
        

    } else {
      
        res.errorStatusCode = 401;
        throw new Error("Email and password are required.");
    
    }
  },

  logout: async (req, res) => {
        req.session = null

        res.status(200).send({
            error: false,
            message: 'Logout OK',
        })

  },
};

/*------------------------------------------------------- */

//! custom error yapinca hata yonetimi imkani artiyor
