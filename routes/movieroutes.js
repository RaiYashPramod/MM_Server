const express = require('express');
const {selectMovieUpdate, prefferedMovieList, createBattle, getBattles, getBattle} = require('../controllers/movieController');
const router = express.Router();


router.post('/movie', selectMovieUpdate);
router.post('/create-battle', createBattle);



router.get('/movie', prefferedMovieList)
router.get('/arena-battles', getBattles)
router.get('/battle-details/:id', getBattle)



module.exports = router;