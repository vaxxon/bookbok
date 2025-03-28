const express = require('express')
const router = express.Router()

const Author = require('../models/author')

router.get('/', async(req, res, next) => { // access db asynchronously
    const authors = await Author.all() // wait until you need to get this info
    res.render('authors/index', {title: 'Authors', authors: authors})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('authors/form', {title: 'Authors'})
})

// author creation route
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Author.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    req.session.flash = {
        type: 'info',
        intro: 'success',
        message: `This author has been ${createdOrUpdated}.`
    }
    res.redirect(303, '/authors')
})

// author editing route
router.get('/edit', async(req, res, next) => {
    let authorIndex = req.query.id;
    let author = Author.get(authorIndex);
    res.render('authors/form', {title: "Authors", author: author, authorIndex: authorIndex})
})

module.exports = router