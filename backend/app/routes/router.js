const router = require('express').Router();
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});


router.use('/api/auth', require('./auth.routes'));

router.use('/api/user', require('./user.routes'));


var roles = require('../config/utils')

module.exports = router;