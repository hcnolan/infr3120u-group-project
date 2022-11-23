let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const reservations = require('../models/reservations');

// Connect to model
let reservationModel = require('../models/reservations')

// Read operation
router.get('/', (req,res,next)=>{
    reservations.find((err,reservationList)=>{
        if(err){
            return console.error(err);
        } else {
            res.render('reservations', { title: 'Reservations', reservationList: reservationList });
        }
    });
})

// Add operation


// Update operation


// Delete operation


module.exports = router;