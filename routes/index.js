const express = require("express")
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {title: 'BookBok'})
})

module.exports = router;