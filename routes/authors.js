const express = require('express')
const router = express.Router()

const Author = require('../models/author')

router.get('/', function(req, res, next) {
    const authors = Author.all
    res.render('authors/index', {title: 'BookBok / Authors', authors: authors})
})

module.exports = router