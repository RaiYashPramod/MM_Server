const express = require('express');
const {selectMovieUpdate, prefferedMovieList, createBattle} = require('../controllers/movieController');
const router = express.Router();


router.post('/movie', selectMovieUpdate);
router.post('/create-battle', createBattle)


router.get('/movie', prefferedMovieList)

module.exports = router;