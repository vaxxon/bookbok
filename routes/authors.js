const express = require('express')
const router = express.Router()

const Author = require('../models/author')

router.get('/', function(req, res, next) {
    const authors = Author.all
    res.render('authors/index', {title: 'BookBok / Authors', authors: authors})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('authors/form', {title : 'BookBok / Authors'})
})

// author creation route
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Author.upsert(req.body)
    res.redirect(303, '/authors')
})

// author editing route
router.get('/edit', async(req, res, next) => {
    let authorIndex = req.query.id;
    let author = Author.get(authorIndex);
    res.render('authors/form', { title: "BookBok / Authors", author: author, authorIndex: authorIndex })
})

module.exports = router