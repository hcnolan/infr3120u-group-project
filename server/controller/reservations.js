let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect to model
let reservationModel = require('../models/reservations')

// Read operation
// get route for the reservation list
module.exports.displayreservationList = (req,res,next)=>{
    reservationModel.find((err,reservationList)=>{
        if(err){
            return console.error(err);
        } else {
            res.render('cars/reservations', { title: 'Reservations', reservationList: reservationList });
        }
    });
}

// Add operation
// Get route for displaying add page
module.exports.displayAddPage = (req, res, next)=> {
    res.render('cars/add', {title:'Book a Reservation'})
}
// Post route for processing the add page
module.exports.processAddPage = (req, res, next)=> {
    let newReservations = reservation ({
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "date":req.body.date,
        "carMake":req.body.carMake,
        "carModel":req.body.carModel,
        });
        reservations.create(newReservations,(err,Reservations)=> {
            if (err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                res.redirect("/reservations");
            }
        });
}

// Update operation
// Get route for displaying Update page
module.exports.displayUpdatePage= (req, res, next)=> {
    let id = req.params.id;
    reservations.findById(id,(err, reservationsToUpdate) =>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.render('cars/update', {title: 'Update Reservation', reservations:reservationsToUpdate});
        }
    });
}
// Post route for displaying the Update page
module.exports.processUpdatePage=(req, res, next)=> {
    let id = req.params.id;
    let updateReservations = reservations({
        "_id":id,
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "date":req.body.date,
        "carMake":req.body.carMake,
        "carModel":req.body.carModel,
    });
    reservations.updateOne({_id:id}, updateReservations, (err)=>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect("/reservations");
        }

    });
}

// Delete operation
// Get to perform Delete
module.exports.performDelete = (req, res, next)=> {
    let id = req.params.id;
    reservations.remove({_id:id}, (err)=>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect("/reservations");
        }
    })
}