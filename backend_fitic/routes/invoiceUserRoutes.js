const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceUserController');
const authMiddleware = require('../middleware/authMiddleware');

/** Protected routes con JWT authentication for bills */
router.use(authMiddleware.authenticate);

router.post('/add', invoiceController.addInvoice);


router.put('/pay', invoiceController.payInvoice);
router.get('/getAllInvoices', invoiceController.getAllInvoices);



router.get('/detailsInvoice', invoiceController.getInvoiceById);

router.get('/getUserInvoices', invoiceController.getUserInvoices);
router.get('/checkInvoicePaymentStatus', invoiceController.checkInvoicePaymentStatus);

module.exports = router;
