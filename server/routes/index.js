let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

/* Get Authentication Pages */
// Get router for login page
router.get('/login', indexController.displayLoginPage);
// post router for login page
router.post('/login', indexController.processLoginPage);

// Get router for registration page
router.get('/register', indexController.displayRegisterPage);
// post router for registration page
router.post('/register', indexController.processRegisterPage);

// post router for logout page
router.post('/logout', indexController.performLogout);

module.exports = router;
