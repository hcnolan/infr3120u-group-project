let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const reservations = require('../models/reservations');

// Connect to model
let reservationModel = require('../models/reservations')

// Read operation
// get route for the reservation list
router.get('/', (req,res,next)=>{
    reservations.find((err,reservationList)=>{
        if(err){
            return console.error(err);
        } else {
            res.render('cars/reservations', { title: 'Reservations', reservationList: reservationList });
        }
    });
})

// Add operation
// Get route for displaying add page
router.get('/add', (req, res, next)=> {
    res.render('cars/add', {title:'Book a Reservation'})
});
// Post route for processing the add page
router.post('/add', (req, res, next)=> {
    let newReservations = reservations ({
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
});


// Update operation
// Get route for displaying Update page
router.get('/update/:id', (req, res, next)=> {
    let id = req.params.id;
    Reservations.findById(id,(err, reservationsToUpdate) =>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.render('cars/update', {title: 'Update Reservation', reservations:reservationsToEdit});
        }
    });
});

// Post route for displaying the Update page
router.post('/update/:id', (req, res, next)=> {
    let id = req.params.id;
    let updateReservations = Reservations({
        "_id":id,
        "First Name":req.body.firstname,
        "Last Name":req.body.lastname,
        "Date":req.body.date,
        "Make":req.body.carMake,
        "Model":req.body.carModel,
    });
    Reservations.updateOne({_id:id}, updateReservations, (err)=>{
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
});


// Delete operation
// Get to perform Delete
router.get('/delete/:id', (req, res, next)=> {
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
});



module.exports = router;