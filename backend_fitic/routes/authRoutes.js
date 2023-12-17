const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
// Rutas de API con autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/checkToken' , authController.checkToken);


router.post('/checkEmailExists', authController.checkEmailExists);
router.post('/checkUsernameExists', authController.checkUsernameExists);
router.get('/checkIsAdmin', authMiddleware.authenticate, authController.checkIsAdmin);


module.exports = router;
