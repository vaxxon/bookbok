const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    const authors = [
        {firstName: 'Suzanne', lastName: 'Clarke'}, 
        {firstName: 'Robin', lastName: 'Hobb'},
        {firstName: 'J.R.R.', lastName: 'Tolkien'}
    ]
    res.render('authors/index', {title: 'BookBok / Authors', authors: authors})
})

module.exports = router