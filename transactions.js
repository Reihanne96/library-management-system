const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/borrow', async (req, res) => {
  const transaction = new Transaction({ ...req.body, borrowDate: new Date() });
  await transaction.save();
  res.status(201).json(transaction);
});

router.post('/return', async (req, res) => {
  const transaction = await Transaction.findOne({ bookID: req.body.bookID, returnDate: null });
  if (transaction) {
    transaction.returnDate = new Date();
    await transaction.save();
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Borrow record not found' });
  }
});

module.exports = router;
