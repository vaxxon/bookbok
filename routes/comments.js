const express = require('express')
const router = express.Router()

// connect model to router
const Comment = require('../models/comment')

// return if unauthorized to edit
function notAuthorized(req, res, returnUrl) {
    req.session.flash = {
        type: 'danger',
        intro: 'Error!',
        message: 'You are not authorized to edit this comment.'
    }
    res.redirect(303, returnUrl)
    return
}

// comment creation/update
router.post('/upsert', async (req, res, next) => {
    let comment = await Comment.get(req.body.id)
    if (comment && req.session.currentUser.id != comment.userId) {
        return notAuthorized(req, res, `/books/show/${comment.bookId}`)
    }
    await Comment.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `Your comment has been ${createdOrUpdated}.`
    }
    res.redirect(303, `/books/show/${comment.bookId}`)
})

// comment editing route
router.get('/edit', async (req, res, next) => {
    let commentId = req.query.id
    let comment = await Comment.get(commentId)
    if (!comment) {
        return notAuthorized(req, res, `/books/show/${comment.bookId}`)
    }
    if (!req.session.currentUser) {
        return notAuthorized(req, res, '/')
    }
    if (req.session.currentUser.id != comment.userId) {
        return notAuthorized(req, res, `/books/show/${comment.bookId}`)
    }
    res.render('comments/form', {title: 'Comment', comment: comment})
})

module.exports = router