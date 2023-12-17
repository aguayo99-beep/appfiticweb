const GymClass = require('../models/GymClass');
const GymClassReservation = require('../models/GymClassReservation');

//Obtener todas las clases de gimnasia
async function getAllGymClasses(req, res) {
  try {
    const gymClasses = await GymClass.find();
    res.status(200).json(gymClasses);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las clases de gimnasia' });
  }
}

//Agregar una nueva clase de gimnasia
async function addGymClass(req, res) {
  try {
    const { name, description, instructor, maxParticipants, reservationDate } = req.body;

    if (!name || !description || !instructor || !maxParticipants || !reservationDate) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newGymClass = new GymClass({ name, description, instructor, maxParticipants, reservationDate });
    await newGymClass.save();
    res.status(201).json({ message: 'Clase de gimnasia agregada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al agregar la clase de gimnasia' });
  }
}

//Obtener una clase de gimnasia por su ID
async function getGymClassById(req, res) {
  try {
    const gymClassId = req.quer.userId;
    const gymClass = await GymClass.findById(gymClassId);
    if (!gymClass) {
      return res.status(404).json({ error: 'Clase de gimnasia no encontrada' });
    }
    res.status(200).json(gymClass);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la clase de gimnasia' });
  }
}

//Actualizar una clase de gimnasia por su ID
async function updateGymClassById(req, res) {
  try {
    const gymClassId = req.body._id;
    const updatedGymClass = req.body;
    const { name, description, instructor, maxParticipants, reservationDate } = req.body;

  //comporbar que no esten vacios los campos
    if (!name || !description || !instructor || !maxParticipants || !reservationDate) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }


    //comporbar que no esten vacios los campos
    if (!gymClassId || !updatedGymClass) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    console.log(gymClassId, updatedGymClass);
    await GymClass.findByIdAndUpdate(gymClassId, updatedGymClass);
    res.status(200).json({ message: 'Clase de gimnasia actualizada exitosamente' });


  
    

  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la clase de gimnasia' });
  }
}

//Eliminar una clase de gimnasia por su ID
async function deleteGymClassById(req, res) {
  try {
    const gymClassId = req.body._id;
    const gymClassReservations = await GymClassReservation.find({ classId: gymClassId });
    if (gymClassReservations.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar la clase de gimnasia porque tiene reservas' });
    }
    await GymClass.findByIdAndDelete(gymClassId);
    res.status(200).json({ message: 'Clase de gimnasia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la clase de gimnasia' });
  }
}

module.exports = {
  getAllGymClasses,
  addGymClass,
  getGymClassById,
  updateGymClassById,
  deleteGymClassById,
};
