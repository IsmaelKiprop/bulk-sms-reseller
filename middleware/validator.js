const { check } = require('express-validator');

exports.validatePhoneBook = [
  check('name')
    .not().isEmpty()
    .withMessage('PhoneBook name is required')
    .isLength({ max: 100 })
    .withMessage('PhoneBook name cannot be more than 100 characters'),
  check('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description cannot be more than 255 characters')
];

exports.validateContact = [
  check('phonebookId')
    .not().isEmpty()
    .withMessage('PhoneBook ID is required')
    .isUUID()
    .withMessage('Invalid PhoneBook ID format'),
  check('phone_number')
    .not().isEmpty()
    .withMessage('Phone number is required')
    .isLength({ max: 20 })
    .withMessage('Phone number cannot be more than 20 characters')
];