
'use strict';

const router = require('express').Router();
const UsersController = require('../controllers/user.controller');


var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};
var fs = require("fs");
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.raw(options));
router.use((req, res, next) => {
  res.payload = {};
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/getAllUsers', urlencodedParser, (req, res, next) =>
  UsersController.getAllUsers()
    .then(users => {

      res.send(users);
    })
    .catch(next));


router.get('/getUserById', urlencodedParser, (req, res, next) =>
  UsersController.getUsersById(req.query.id)
    .then(user => {
      res.send(user);
    })
    .catch(next));


router.get('/getUserByEmail', urlencodedParser, (req, res, next) =>
  UsersController.getUserByEmail(req.query.email)
    .then(user => {
      res.send(user);
    })
    .catch(next));

router.delete('/deleteUserById', urlencodedParser, (req, res, next) =>
  UsersController.deleteUsers(req)
    .then(resultat => {
      res.send(resultat);
    })
    .catch(next));



router.put('/updateUserById', urlencodedParser, (req, res, next) =>
  UsersController.getRawBody(req)
    .then(user => {
      res.payload.user = user

      return UsersController.updateUsers(req, res.payload.user)
    })
    .then(resultat => {
      res.send(resultat);
    })
    .catch(next));




router.get("/api/test/all", UsersController.allAccess);

router.get(
  "/api/test/user",

  UsersController.userBoard
);



router.get(
  "/api/test/admin",

  UsersController.adminBoard
);

module.exports = router;