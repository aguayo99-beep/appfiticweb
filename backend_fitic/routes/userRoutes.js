const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

/**Protected routes con JWT authentication for users */
router.use(authMiddleware.authenticate);

router.get('/getUsers', userController.getAllUsers);
router.post('/getUsersByKeyWords', userController.searchUsers);

router.get('/isCorrectPassword', userController.isPasswordValid);

router.put('/profile', userController.updateUserProfile);

router.get('/checkAllInvoicesPaid', userController.checkAllInvoicesPaid);



router.post('/change-password', userController.changePassword);


router.delete('/delete-account/:userName', userController.deleteAccount);

router.post('/logout',userController.logout)

module.exports = router;
