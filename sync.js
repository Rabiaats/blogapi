"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const { User } = require('./src/models/user.model')
const { BlogCategory } = require('./src/models/blogCategory.model')
const { BlogPost } = require('./src/models/blogPost.model')

/* ------------------------------------------------------- */

module.exports = async () => {

    /* Exampla Data */
    // Deleted All Records:
    await User.deleteMany().then(() => console.log(' - User Deleted All'))
    await BlogCategory.deleteMany().then(() => console.log(' - BlogCategory Deleted All'))
    await BlogPost.deleteMany().then(() => console.log(' - BlogPost Deleted All'))

    // Example User:
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstname: "Test",
        lastname: "Test"
    })
    // Example Category:
    const blogCategory = await BlogCategory.create({
        name: 'Test Category'
    })
    // Example Posts:
    // new Array(elemanSayisi)
    // const array = [1,2,3]
    // Array.of(1,2,3)
    for (let key in [...Array(200)]) {
        await BlogPost.create({
            userId: user._id,
            categoryId: blogCategory._id,
            title: `test ${key} title`,
            content: `test ${key} content`,
            published: Boolean(key % 2)
        })
    }

    // Finish:
    console.log('* Syncronized.')

}

/* ------------------------------------------------------- */