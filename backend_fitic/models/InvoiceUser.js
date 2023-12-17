const mongoose = require('mongoose');

////Definition of the invoice user model

const invoiceUserSchema = new mongoose.Schema({
 
  userId: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    enum: ["Gold", "Silver", "Platinum"],
  },
  state: {
    type: String,
    enum: ["payed", "notpayed"],
  },


  dateIssue: {
    type: Date,
    required: true,
  },

  membershipExpirationDate: {
    type: Date,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  }
});

const Bill = mongoose.model('Bills', invoiceUserSchema);

module.exports = Bill;
