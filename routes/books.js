const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    const books = ['Piranesi', 'Ship of Magic', 'The Lord of the Rings', 'Wicked']
    res.render('books/index', {title: 'BookBok / Books', books: books})
})

module.exports = router