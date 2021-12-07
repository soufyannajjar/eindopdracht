const express = require('express');
const router = express.Router();

const company = require('../controllers/company');
const video = require('../controllers/video')

//Company
router.get('/companies', company.all);
router.get('/companies/:id', company.findById);
router.post('/companies', company.add);
router.put('/companies/:id', company.update);
router.delete('/companies/:id', company.delete);

//Video
router.get('/videos', video.all);
router.post('/videos', video.add);
router.put('/videos/:id', video.update);
router.delete('/videos/:id', video.delete);
router.use((req, res) => {
    res.status("404").send({message: "This entry point does not exist !"})
});


module.exports = router;