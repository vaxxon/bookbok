const express = require('express')
const router = express.Router()

// connect model to router
const Author = require('../models/author')

// get authors from the db
router.get('/', async(req, res, next) => { // access db asynchronously
    const authors = await Author.all() // wait until you need to get this info
    res.render('authors/index', {title: 'Authors', authors: authors})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('authors/form', {title: 'Authors'})
})

// author creation/update
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Author.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `This author has been ${createdOrUpdated}.`
    }
    res.redirect(303, '/authors')
})

// author editing route
router.get('/edit', async (req, res, next) => {
    let author = await Author.get(req.query.id);
    res.render('authors/form', { title: "Authors", author: author })
})

// no idea what this does
module.exports = router