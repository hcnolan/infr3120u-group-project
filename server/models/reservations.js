let mongoose = require('mongoose');
// Create reservation model
let reservationModel = mongoose.Schema({
    firstName: String,
    lastName: String,
    date: String,
    carMake: String,
    carModel: String,
},
{
    collection: "Reservations"
})
module.exports = mongoose.model('ReservationModel', reservationModel);