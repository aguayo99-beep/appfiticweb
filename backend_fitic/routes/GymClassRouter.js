const express = require('express');
const router = express.Router();
const gymClassController = require('../controllers/GymClassController');

//Obtener todas las clases de gimnasia
router.get('/gymClasses', gymClassController.getAllGymClasses);

//Agregar una nueva clase de gimnasia
router.post('/add', gymClassController.addGymClass);

//Obtener una clase de gimnasia por su ID
router.get('/gymClass', gymClassController.getGymClassById);

//Actualizar una clase de gimnasia por su ID
router.put('/gymClasses', gymClassController.updateGymClassById);

//Eliminar una clase de gimnasia por su ID
router.delete('/gymClasses', gymClassController.deleteGymClassById);

module.exports = router;
