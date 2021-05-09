
'use strict';

const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller');
const RoleController = require('../controllers/roleController');

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
var role = require('../config/utils');



router.post('/login', urlencodedParser, (req, res, next) =>
authcontroller.getRawBody(req)
.then(user => { 
return authcontroller.login(user)
})
.then(resultat => {
res.send(resultat);
})
.catch(next));

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
    return authcontroller.singup(user)
})
.then(resultat => {
  res.send(resultat);
  })
.catch(next));



router.post('/signinFB', urlencodedParser, (req, res, next) =>
authcontroller.getRawBody(req)
.then(user => {
    return authcontroller.signinFB(user)
})
.then(resultat => {
  res.send(resultat);
  })
.catch(next));


module.exports = router;