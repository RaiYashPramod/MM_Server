const express = require('express');
const {selectMovieUpdate, prefferedMovieList} = require('../controllers/movieController');
const router = express.Router();


router.post('/movie', selectMovieUpdate);


router.get('/movie', prefferedMovieList)

module.exports = router;