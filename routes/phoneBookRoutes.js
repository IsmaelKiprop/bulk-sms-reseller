const express = require('express');
const {
  getPhoneBooks,
  getPhoneBook,
  createPhoneBook,
  updatePhoneBook,
  deletePhoneBook,
  getPhoneBookContacts
} = require('../controllers/phoneBookController');
const { validatePhoneBook } = require('../middleware/validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth protection to all routes
router.use(protect);

router
  .route('/')
  .get(getPhoneBooks)
  .post(validatePhoneBook, createPhoneBook);

router
  .route('/:id')
  .get(getPhoneBook)
  .put(validatePhoneBook, updatePhoneBook)
  .delete(deletePhoneBook);

router
  .route('/:id/contacts')
  .get(getPhoneBookContacts);

module.exports = router;