const { Router } = require("express");

const router = Router();

const { getMovie } = require('../controllers/movie');
const { getPerson } = require('../controllers/person');


router.get("/movie/:id", getMovie);

router.get("/person/:id", getPerson);


module.exports = router;