'use strict'

var express = require('express');
const auth = require('../middlewares/auth');
var UserController = require('../controllers/user');
var router = express.Router();

router.post('/save-user', UserController.saveUser);
router.get('/user/:id?', auth, UserController.getUser);
router.get('/users', auth, UserController.getUsers);
router.get('/users/:id', auth, UserController.getUsersExcept);
router.put('/user/:id', auth, UserController.updateUser);
router.delete('/user/:id', auth, UserController.deleteUser);
router.get('/deleteUsers/:id', auth, UserController.deleteUsers);


module.exports = router;