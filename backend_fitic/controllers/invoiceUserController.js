const InvoiceUser = require('../models/InvoiceUser');
const mongoose = require('mongoose');


async function addInvoice(req, res) {
  try {
    req.body.userId = req.user.id;
    const newInvoice = new InvoiceUser(req.body);
    await newInvoice.save();

    res.status(201).json({ message: 'Factura agregada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la factura' });
  }
}

async function getAllInvoices(req, res) {
  try {
    const invoices = await InvoiceUser.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todas las facturas' });
  }
}


async function payInvoice(req, res) {
  try {
    const invoiceId = req.body.invoiceId;
    await InvoiceUser.findByIdAndUpdate(invoiceId, { state: 'payed' });
    res.status(200).json({ message: 'Factura pagada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al pagar la factura' });
  }
}

async function getInvoiceById(req, res) {
  try {
    const invoiceId = req.body.invoiceId;
    const invoice = await InvoiceUser.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la factura' });
  }
}

async function checkInvoicePaymentStatus(req, res) {
  try {
    const invoiceId = req.body.invoiceId;
    console.log(invoiceId);
    const invoice = await InvoiceUser.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    if (invoice.state === 'payed') {
      res.status(200).json({ isPaid: true });
    } else {
      res.status(200).json({ isPaid: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el estado de la factura' });
  }
}


async function getUserInvoices(req, res) {
  try {
    const userId = req.query.userId;
    console.log(userId);

   

    const userInvoices = await InvoiceUser.find({ userId});
    console.log(userInvoices);

    res.status(200).json(userInvoices);
  } catch (error) {
    console.error('Error al obtener las facturas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las facturas del usuario' });
  }
}


module.exports = {
  addInvoice,
  getAllInvoices,
  payInvoice,
  getInvoiceById,
  checkInvoicePaymentStatus,
  getUserInvoices, 
};
