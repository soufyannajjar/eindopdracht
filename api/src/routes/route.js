const express = require('express');
const router = express.Router();

const company = require('../controllers/company');
const movie = require('../controllers/movie')

//Company
router.get('/companies', company.all);
router.post('/companies', company.add);
router.put('/companies/:id', company.update);
router.delete('/companies/:id', company.delete);


router.put('/videos/:id', movie.update);
router.delete('/videos/:id', movie.delete);
router.use((req, res) => {
    res.status("404").send({message: "This entry point does not exist !"})
});


module.exports = router;