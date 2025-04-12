// routes/contactGroupRoutes.js
const express = require('express');
const {
  addContactToGroup,
  removeContactFromGroup
} = require('../controllers/contactGroupController');

const router = express.Router();

router
  .route('/:id/groups/:groupId')
  .post(addContactToGroup)
  .delete(removeContactFromGroup);

module.exports = router;