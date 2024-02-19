const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config'); 
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const invoiceUserRoutes = require('./routes/invoiceUserRoutes'); 
const gymClassRouter = require('./routes/GymClassRouter'); 
const gymClassReservation = require('./routes/GymClassReservationRouter'); 
const cors = require('cors');

const expressListEndpoints = require('express-list-endpoints');




const app = express();

app.use(cors());

app.use(express.json());

//Conexión a la base de datos MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/user', userRoutes); // Rutas de usuario
app.use('/api/invoices', invoiceUserRoutes); // Rutas de facturas
app.use('/api/gymclassreservation', gymClassReservation); // Rutas de reservas de clase

app.use('/api/gymclass', gymClassRouter); // Rutas de clases
// Rutas
//app.use('/api/auth', authRoutes); // Rutas de reservas de clase
//app.use('/api/user', userRoutes);
 // Rutas de clases





console.log(expressListEndpoints(app));
// Inicio del servidor
app.listen(config.port, () => {
  console.log(`Servidor en ejecución en el puerto ${config.port}`);
});
