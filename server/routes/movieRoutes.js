//IF you are using OPTION 2 under server/index.js, then refer to this file

const router = require('express').Router();
const movieController = require('../controllers/movieController.js');
// const actorRoutes = require('/actorRoutes.js')

//Route different requests to different endpoints
router.get('/search', movieController.getSearch)
router.get('/genres', movieController.getGenres)
router.post('/save', movieController.saveMovie)
router.post('/delete', movieController.deleteMovie)
router.get('/favorites', movieController.getFavorites)

// router.use('/actors', actorRouter)
//
module.exports = router;