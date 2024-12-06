const express = require('express');
const router = express.Router();

const {
    markAsCompleted
} = require('../controllers/exerciseCompletionController');

router.post("/", markAsCompleted);
module.exports = router;
