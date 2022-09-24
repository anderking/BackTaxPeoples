"use strict";

var express = require("express");
var PublicationController = require("../controllers/publication");
const auth = require("../middlewares/auth");
var router = express.Router();

router.post("/save-publication", auth, PublicationController.savePublication);
router.get("/publication/:id?", auth, PublicationController.getPublication);
router.get("/publications", auth, PublicationController.getPublications);
router.get(
	"/publications/:id",
	auth,
	PublicationController.getPublicationsUser
);
router.put("/publication/:id", auth, PublicationController.updatePublication);
router.delete(
	"/publication/:id",
	auth,
	PublicationController.deletePublication
);

module.exports = router;
