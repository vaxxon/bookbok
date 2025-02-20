const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    const authors = ['Suzanne Clarke', 'Robin Hobb', 'J.R.R. Tolkien']
    res.render('authors/index', {title: 'BookBok / Authors', authors: authors})
})

module.exports = router