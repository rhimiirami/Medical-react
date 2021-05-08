
'use strict';

const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller');


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


router.post('/signin', urlencodedParser, (req, res, next) =>
  authcontroller.getRawBody(req)
    .then(user => {
      return authcontroller.signin(user)
    })
    .then(resultat => {
      res.send(resultat);
    })
    .catch(next));

router.post('/signup', urlencodedParser, (req, res, next) =>
  authcontroller.getRawBody(req)
    .then(user => {
      res.payload.user = user
      return authcontroller.singup(res.payload.user)
    })
    .then(resultat => {
      res.send(resultat);
    })
    .catch(next));


/* router.post('/signinFB', urlencodedParser, (req, res, next) =>
  authcontroller.getRawBody(req)
    .then(user => {
      return authcontroller.signinFB(user)
    })
    .then(resultat => {
      res.send(resultat);
    })
    .catch(next)); */


module.exports = router;