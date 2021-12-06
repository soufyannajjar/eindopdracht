const express = require('express');
const router = express.Router();

const company = require('../controllers/company');

router.get('/companies', company.all);
router.post('/companies', company.add);
router.put('/videos/:id', company.update);
router.delete('/videos/:id', company.delete);
router.use((req, res) => {
    res.status("404").send({message: "This entry point does not exist !"})
});


module.exports = router;