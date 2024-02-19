const express = require('express');
const router = express.Router();
console.log("Hola2");
const gymClassReservationController = require('../controllers/gymClassReservationController');
const authMiddleware = require('../middleware/authMiddleware');

//Rutas protegidas con JWT authentication para reservas de clases de gimnasia
router.use(authMiddleware.authenticate);

//Obtener todas las reservas de clases de gimnasia
router.get('/all', gymClassReservationController.getAllGymClassReservations);

//Obtener reservar por id de usuario
router.get('/user', gymClassReservationController.getReservationByUserId);

//Actualizar una reserva de clase de gimnasia por su ID
router.put('/update', gymClassReservationController.updateReservation);

//Agregar una nueva reserva de clase de gimnasia
router.post('/add', gymClassReservationController.addReservation);

//Eliminar una reserva por su ID
router.delete('/delete', gymClassReservationController.deleteReservation);

module.exports = router;


