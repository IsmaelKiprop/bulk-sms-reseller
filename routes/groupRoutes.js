// routes/groupRoutes.js
const express = require('express');
const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupContacts
} = require('../controllers/groupController');
const { validateGroup } = require('../middleware/validator');

const router = express.Router();

router
  .route('/')
  .get(getGroups)
  .post(validateGroup, createGroup);

router
  .route('/:id')
  .get(getGroup)
  .put(validateGroup, updateGroup)
  .delete(deleteGroup);

router
  .route('/:id/contacts')
  .get(getGroupContacts);

module.exports = router;