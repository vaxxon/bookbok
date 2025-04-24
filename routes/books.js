const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookUser = require('../models/bookUser')
const Comment = require('../models/comment')

router.get('/', async (req, res, next) => {
    const books = await Book.all()
    res.render('books/index', {title: 'Books', books: books})
})

// form submission route
router.get('/form', async (req, res, next) => {
    res.render('books/form', {title: 'Books', authors: await Author.all(), genres: await Genre.all()})
})

// book creation route
router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    await Book.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `The book has been ${createdOrUpdated}.`,
    }
    res.redirect(303, '/books')
})

// book editing route
router.get('/edit', async (req, res, next) => {
    let bookId = req.query.id;
    let book = await Book.get(bookId);
    book.authorIds = (await Author.allForBook(book)).map(author => author.id)
    res.render('books/form', { 
        title: "Edit Book", 
        book: book, 
        authors: await Author.all(),
        genres: await Genre.all()
    })
})

// book detail route
router.get('/show/:id', async (req, res, next) => {
    const book = await Book.get(req.params.id)
    let templateVars = {
        title: "Books",
        book: book,
        bookId: req.params.id,
        statuses: BookUser.statuses,
        comments: await Comment.allForBook(req.params.id)
    }
    book.authors = await Author.allForBook(book)
    if ("genreId" in book) {
        templateVars['genre'] = await Genre.get(book.genreId)
    }
    if (req.session.currentUser) {
        templateVars['bookUser'] = await BookUser.get(book, req.session.currentUser)
    }
    if ('commentIds' in book) {
        templateVars['comments'] = await Comment.allForBook(book)
    }
    res.render('books/show', templateVars)
})

module.exports = router