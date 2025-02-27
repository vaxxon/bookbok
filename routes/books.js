const express = require('express')
const router = express.Router()

const Book = require('../models/book')

router.get('/', function(req, res, next) {
    const books = Book.all
    res.render('books/index', {title: 'BookBok / Books', books: books})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('books/form', {title : 'BookBok / Books'})
})

// book creation route
router.post('/create', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Book.add(req.body)
    res.redirect(303, '/books')
})

// book editing route
router.get('/edit', async(req, res, next) => {
    let bookIndex = req.query.id;
    let book = Book.get(bookIndex);
    res.render('books/form', { title: "BookBok / Edit Book", book: book, bookIndex: bookIndex })
})

module.exports = router