const express = require('express')
const router = express.Router()

const Genre = require('../models/genre')

router.get('/', function(req, res, next) {
    const genres = Genre.all
    res.render('genres/index', {title: 'BookBok / Genres', genres: genres})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('genres/form', {title : 'BookBok / Genres'})
})

// author creation route
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Genre.upsert(req.body)
    res.redirect(303, '/genres')
})

// author editing route
router.get('/edit', async(req, res, next) => {
    let genreIndex = req.query.id;
    let genre = Genre.get(genreIndex);
    res.render('genres/form', { title: "BookBok / Genres", genre: genre, genreIndex: genreIndex })
})

module.exports = router