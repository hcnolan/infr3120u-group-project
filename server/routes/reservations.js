let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const reservations = require('../models/reservations');

// Connect to model
let reservationModel = require('../models/reservations')
let reservationController = require('../controller/reservations')

/* CRUD OPERATION */

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



// Read operation
// get route for the reservation list
router.get('/', reservationController.displayreservationList);

// Add operation
// Get route for displaying add page
router.get('/add', requireAuth, reservationController.displayAddPage);
// Post route for processing the add page
router.post('/add', requireAuth, reservationController.processAddPage );


// Update operation
// Get route for displaying Update page
router.get('/update/:id', requireAuth, reservationController.displayUpdatePage);

// Post route for displaying the Update page
router.post('/update/:id', requireAuth, reservationController.processUpdatePage);


// Delete operation
// Get to perform Delete
router.get('/delete/:id', requireAuth, reservationController.performDelete );



module.exports = router;