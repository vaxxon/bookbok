const express = require('express')
const router = express.Router()
// import model to route
const Genre = require('../models/genre')

// get route for other routers
router.get('/', function(req, res, next) {
    const genres = Genre.all
    res.render('genres/index', {title: 'BookBok / Genres', genres: genres})
})

// form submission route
router.get('/form', async(req, res, next) => {
    res.render('genres/form', {title : 'BookBok / Genres'})
})

// genre creation route
router.post('/upsert', async(req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Genre.upsert(req.body)
    let createdOrUpdated = req.body.id ? 'updated' : 'created'
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `The genre has been ${createdOrUpdated}.`
    }
    res.redirect(303, '/genres')
})

// genre editing route
router.get('/edit', async(req, res, next) => {
    let genreIndex = req.query.id;
    let genre = Genre.get(genreIndex);
    res.render('genres/form', { title: "BookBok / Genres", genre: genre, genreIndex: genreIndex })
})

// no idea what this does frankly
module.exports = router