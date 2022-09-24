"use strict";

var express = require("express");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
var UserController = require("../controllers/user");
var PublicationController = require("../controllers/publication");
var UploadController = require("../controllers/upload");

var router = express.Router();
router.use(fileUpload());

router.post(
	"/upload-image-user/:id",
	uploadStrategy,
	UploadController.uploadUserImageAzure
);
router.post(
	"/upload-image-publication/:id",
	UploadController.uploadPublicationImageAzure
);

module.exports = router;
