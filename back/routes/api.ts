const router = require('express').Router();

router.use('/artist', require('./api/generalSearchs/artist'));
router.use('/artistAll', require('./api/generalSearchs/artistAll'));
router.use('/artistTopTracks', require('./api/generalSearchs/artistTopTracks'));
router.use('/artistAlbum', require('./api/generalSearchs/artistAlbum'));
router.use('/categorys', require('./api/generalSearchs/categorys'));


router.use('/topList', require('./api/listSearchs/topList'));
router.use('/playList', require('./api/listSearchs/playList'));


router.use('/albumId', require('./api/albumSearchs/albumId'));

router.use('/artistId', require('./api/artistSearchs/artistId'))

router.use('/songsId', require('./api/songsSearchs/songsId'))

router.use('/categoriesId', require('./api/categoriesSearchs/categoriesId'))


module.exports = router;