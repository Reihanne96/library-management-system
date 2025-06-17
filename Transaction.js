const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userID: String,
  borrowDate: Date,
  returnDate: Date
});
module.exports = mongoose.model('Transaction', TransactionSchema);
