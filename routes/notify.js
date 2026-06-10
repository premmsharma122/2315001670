const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifyController');


router.get('/all', controller.fetchMyNotifications);


router.patch('/read/:id', controller.markAsRead);


router.patch('/read-all-clear', controller.clearAllUnread);


router.post('/new', controller.createNewNotification);

module.exports = router;