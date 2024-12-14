"use strict";
const router = require("express").Router();

// Call Controllers:
const {login, logout} = require('../controllers/auth.controller')

// URL: /auth/login

router.route('/login').post(login)

router.route('/logout').all(logout)

module.exports = router