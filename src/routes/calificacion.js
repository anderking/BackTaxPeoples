"use strict";

var express = require("express");
var CalificacionController = require("../controllers/calificacion");
const auth = require("../middlewares/auth");
var router = express.Router();

router.post("/upCalificacion", auth, CalificacionController.upCalificacion);
router.get(
	"/calificacion/:idE/:idR",
	auth,
	CalificacionController.isCalificacion
);
router.get(
	"/getCalificacion/:idE/:idR",
	auth,
	CalificacionController.getCalificacion
);
router.put(
	"/calificacion/:id",
	auth,
	CalificacionController.updateCalificacion
);
router.get(
	"/calificaciones/:idR",
	auth,
	CalificacionController.getCalificacionesR
);

module.exports = router;
