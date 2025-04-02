const express = require('express')
const router = express.Router()

const Comment = require('../models/comment')

// get route for other routers
router.get('/', async (req, res, next) => {
    let bookId = req.body.bookId
    const comments = Comment.allForBook(bookId)
    res.render('comments/index', {title: 'Comments', comments: comments})
})

// comment creation/update
router.post('/upsert', async (req, res, next) => {
    Comment.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    let bookId = req.body.bookId
    let redirect = `/books/show/${bookId}` // redirect back to the book's page. make sure to use absolute path
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `Your comment has been ${createdOrUpdated}.`
    }
    res.redirect(303, redirect)
})

// comment editing route
router.get('/edit', async (req, res, next) => {
    let commentIndex = req.query.id
    let comment = Comment.get(commentIndex)
    res.render('comments/form', {title: 'Comment', comment: comment, commentIndex: commentIndex})
})

module.exports = router