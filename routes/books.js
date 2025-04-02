const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookUser = require('../models/bookUser')
const Comment = require('../models/comment')

router.get('/', function(req, res, next) {
    const books = Book.all
    res.render('books/index', {title: 'Books', books: books})
})

// form submission route
router.get('/form', async(req, res, next) => {
    let bookIndex = req.body.id
    res.render('books/form', {title: 'Books', authors: Author.all, genres: Genre.all, comments: Comment.allForBook(bookIndex)})
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
        title: "Edit Book", 
        book: book, 
        bookIndex: bookIndex, 
        authors: Author.all,
        genres: Genre.all,
        comments: Comment.allForBook(bookIndex)
    })
})

// book detail route
router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: "Books",
        book: Book.get(req.params.id),
        bookId: req.params.id,
        statuses: BookUser.statuses
    }
    if (templateVars.book.authorIds) {
        templateVars.authors = templateVars.book.authorIds.map((authorId) => Author.get(authorId))
    }
    if ("genreId" in templateVars.book) {
        templateVars['genre'] = Genre.get(templateVars.book.genreId)
    }
    if (req.session.currentUser) {
        templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email)
    }
    if ('commentIds' in templateVars.book) {
        templateVars['comments'] = templateVars.book.commentIds.map((commentId) => Comment.get(commentId))
    }
    res.render('books/show', templateVars)
})

module.exports = router