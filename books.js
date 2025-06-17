const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const books = await Book.find();
  const bookStatuses = await Promise.all(books.map(async (book) => {
    const activeTransaction = await Transaction.findOne({ bookID: book._id, returnDate: null });
    return {
      ...book.toObject(),
      status: activeTransaction ? 'Borrowed' : 'Available'
    };
  }));
  res.json(bookStatuses);
});

router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

router.put('/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;