'use strict'

var express = require('express');
const fileUpload = require('express-fileupload');
var UserController = require('../controllers/user');
var PublicationController = require('../controllers/publication');
var router = express.Router();
router.use(fileUpload());

router.post('/upload-image-user/:id', UserController.uploadImage);
router.get('/get-image-user/:image', UserController.getImageFile);
router.post('/upload-image-publication/:id', PublicationController.uploadImage);
router.get('/get-image-publication/:image', PublicationController.getImageFile);

module.exports = router;