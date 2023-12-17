const GymClass = require('../models/GymClass');
const User = require('../models/User');
const GymClassReservation = require('../models/GymClassReservation');

//Obtener todas las reservas de clases de gimnasia
async function getAllGymClassReservations(req, res) {
  try {
    const reservations = await GymClassReservation.find();
    console.log(reservations);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas de clases de gimnasia' });
  }
}

//obtener reservar por id de usuario
async function getReservationByUserId(req, res) {
  try {
    const userId = req.query.userId; // Cambia aquí a gymClassId
    console.log("useridd", userId);

    const reservations = await GymClassReservation.find({ userId: userId }); // Asegúrate de que estés utilizando el campo correcto en tu modelo
    console.log(reservations);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas de clases de gimnasia' });
  }
}




//Agregar una nueva reserva de clase de gimnasia y verificar la disponibilidad de plazas
async function addReservation(req, res) {
  try {
    const { userId,classId} = req.body;
    console.log(req.body);
    
    console.log(userId, " ",  classId);

    const gymClass = await GymClass.findById(classId);
    const user = await User.findById(userId);

    //comprobar que no esten vacios los campos
    if (!userId || !classId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

 

    if (!gymClass) {
      return res.status(404).json({ error: 'Clase de gimnasia no encontrada' });
    }

    //Verificar si hay plazas disponibles
    const reservationsForClass = await GymClassReservation.find({ classId });
    if (reservationsForClass.length >= gymClass.maxParticipants) {
      return res.status(400).json({ error: 'No hay plazas disponibles en esta clase' });
    }


    //Verificar si el usuario ya tiene una reserva para esta clase
    const userReservations = await GymClassReservation.find({ classId, userId });
    if (userReservations.length > 0) {
      return res.status(400).json({ error: 'Ya tienes una reserva para esta clase' });
    }
  


    //extraer el nombre de la clase de gimnasia
    const gymClassName = gymClass.name;
    const gymClassDate = gymClass.reservationDate;

    const instructorName = gymClass.instructor;
    const userName = user.name;


    //Si hay plazas disponibles, se agrega la reserva
    const newReservation = new GymClassReservation({ userId, classId, gymClassName,userName, instructorName,gymClassDate });

    await newReservation.save();
    console.log("Hola");

    res.status(201).json({ message: 'Reserva de clase de gimnasia agregada exitosamente' });
    } catch (error) {
      console.log(error);
    res.status(500).json({ error: 'Error al agregar la reserva de clase de gimnasia' });
    }
    }

    //funcion que editar una recerba pasando el id de la reserva 
    async function updateReservation(req, res) {
    try {
      const reservationId = req.body._id;
      const updatedReservation = req.body;
      //COMPORBAR QUE NO ESTEN VACIOS LOS CAMPOS
      if (!reservationId) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      await GymClassReservation.findByIdAndUpdate(reservationId, updatedReservation);
      res.status(200).json({ message: 'Reserva de clase de gimnasia actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la reserva de clase de gimnasia' });

    }
    }

    //Eliminar una reserva por su ID
    async function deleteReservation(req, res) {
    try {
      const reservationId = req.body._id;
      await GymClassReservation.findByIdAndDelete(reservationId);
      res.status(200).json({ message: 'Reserva de clase de gimnasia eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la reserva de clase de gimnasia' });
    }
    }

    module.exports = {
    addReservation,
    getReservationByUserId,
    getAllGymClassReservations,
    updateReservation,
    deleteReservation,
    };
