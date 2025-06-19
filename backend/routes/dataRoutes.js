const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const dataController = require('../controllers/dataController');

router.post('/', authMiddleware, dataController.createNote);
router.get('/', authMiddleware, dataController.getNotes);

module.exports = router;
