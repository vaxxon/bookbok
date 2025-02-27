const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

router.get('/', function(req, res, next) {
    const books = Book.all
    res.render('books/index', {title: 'BookBok / Books', books: books})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('books/form', {title : 'BookBok / Books', authors: Author.all})
})

// book creation route
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Book.upsert(req.body)
    res.redirect(303, '/books')
})

// book editing route
router.get('/edit', async(req, res, next) => {
    let bookIndex = req.query.id;
    let book = Book.get(bookIndex);
    res.render('books/form', { title: "BookBok / Edit Book", book: book, bookIndex: bookIndex, authors: Author.all })
})

// book detail route
router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: "BookBok / Books",
        book: Book.get(req.params.id),
        bookId: req.params.id
    }
    if("authorId" in templateVars.book) {
        templateVars['author'] = Author.get(templateVars.book.authorId)
    }
    res.render('books/show', templateVars)
})

module.exports = router