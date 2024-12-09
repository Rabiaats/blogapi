"use strict";
// Password Encrypt (PBKDF2 Method):
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// passwordEncrypt():

const crypto = require("node:crypto");

// const paswwordEncyption = function (password) {
//   (keyCode = process.env.SECRET_KEY),
//     (loopCount = 10_000),
//     (charCount = 32),
//     (encType = "sha512");
//   return crypto
//     .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
//     .toString("hex");
// };

//! Alternatifi bcrypt arastirr fikrin olsun !\\

const passwordEncypt = function (password) {
  //! const salt = crypto.randomBytes(16).toString("hex");
  //loopCount (iteration count) için 10,000 makul bir başlangıç noktasıdır
  //charCount (key length) için 32 (256-bit) yeterlidir.
  const salt = process.env.SECRET_KEY;
  const iterations = 10_000;
  const keyLength = 32;
  //! en az 16 olmak zorunda - 24 - 32
  const encType = "sha512"; //Secure Hash Algorithm

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, encType)
    .toString("hex");
  return hash;
};

const verifyPassword = (password, hash) => {
  const salt = process.env.SECRET_KEY;
  const iterations = 10_000;
  const keyLength = 32;
  const newHash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
    .toString("hex");

  return newHash === hash;
};

module.exports = passwordEncypt;

//* iteration ve keyLength uzadikca password olusturma suresi uzar