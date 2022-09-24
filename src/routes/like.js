"use strict";

var express = require("express");
var LikeController = require("../controllers/like");
const auth = require("../middlewares/auth");
var router = express.Router();

router.post("/like/:idP", auth, LikeController.upLike);
router.put("/like/:idP", auth, LikeController.disLike);
router.get("/likesPublication/:idP", auth, LikeController.getLikesPublication);
router.get("/likesUser/:idU", auth, LikeController.getLikesUser);
router.get("/likes", auth, LikeController.getLikes);
router.get("/islikes/:idU/:idP", auth, LikeController.isLike);

module.exports = router;
