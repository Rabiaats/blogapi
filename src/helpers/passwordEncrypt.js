"use strict";

const crypto = require("node:crypto");


const passwordEncypt = function (password) {
  const salt = process.env.SECRET_KEY;
  const iterations = 10_000;
  const keyLength = 32;
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
