const express = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateLastMessage
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth protection to all routes
router.use(protect);

router
  .route('/')
  .get(getContacts)
  .post(validateContact, createContact);

router
  .route('/:id')
  .get(getContact)
  .put(validateContact, updateContact)
  .delete(deleteContact);

router
  .route('/:id/message')
  .put(updateLastMessage);

module.exports = router;