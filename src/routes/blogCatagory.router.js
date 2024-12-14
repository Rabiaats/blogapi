"use strict";

const router = require("express").Router();

// Call Controllers:
const {blogCategory} = require('../controllers/blogCategory.controller')

//* blog/category
//* /blog/category/id

router.route('/')
    .get(blogCategory.list)
    .post(blogCategory.create);

router.route('/:categoryId')
    .get(blogCategory.read)
    .put(blogCategory.update)
    .patch(blogCategory.update)
    .delete(blogCategory.delete)

module.exports = router