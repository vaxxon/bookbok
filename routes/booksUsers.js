const express = require('express')
const router = express.Router()

const BookUser = require('../models/bookUser')

router.post('/upsert', async (req, res, next) => {
    await BookUser.upsert(req.body)
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Your status has been stored.'
    }
    res.redirect(303, `/books/show/${req.body.bookId}`)
})

module.exports = router