const express = require('express')
const router = express.Router()

const BookUser = require('../models/bookUser')

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    let bookId = req.body.bookId
    let redirect = `/books/show/${bookId}` // redirect back to the book's page. make sure to use absolute path
    BookUser.upsert(req.body)
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Your status has been stored.'
    }
    res.redirect(303, redirect)
})

module.exports = router