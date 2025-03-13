const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookUser = require('../models/bookUser')

router.get('/', function(req, res, next) {
    const books = Book.all
    res.render('books/index', {title: 'BookBok / Books', books: books})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('books/form', {title : 'BookBok / Books', authors: Author.all, genres: Genre.all})
})

// book creation route
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Book.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `The book has been ${createdOrUpdated}.`,
    }
    res.redirect(303, '/books')
})

// book editing route
router.get('/edit', async(req, res, next) => {
    let bookIndex = req.query.id;
    let book = Book.get(bookIndex);
    res.render('books/form', { 
        title: "BookBok / Edit Book", 
        book: book, 
        bookIndex: bookIndex, 
        authors: Author.all,
        genres: Genre.all
    })
})

// book detail route
router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: "BookBok / Books",
        book: Book.get(req.params.id),
        bookId: req.params.id,
        statuses: BookUser.statuses
    }
    if("authorIds" in templateVars.book) {
        templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId))
    }
    if("genreId" in templateVars.book) {
        templateVars['genre'] = Genre.get(templateVars.book.genreId)
    }
    if (req.session.currentUser) {
        templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email)
    }
    res.render('books/show', templateVars)
})

module.exports = router