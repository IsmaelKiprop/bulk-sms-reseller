const { Contact, PhoneBook } = require('../models/index');
const { validationResult } = require('express-validator');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
exports.getContacts = async (req, res) => {
  try {
    // Get all contacts from phonebooks owned by this user
    const contacts = await Contact.findAll({
      include: [{
        model: PhoneBook,
        as: 'phonebook',
        where: { userId: req.user.id },
        attributes: ['id', 'name']
      }]
    });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      where: { id: req.params.id },
      include: [{
        model: PhoneBook,
        as: 'phonebook',
        where: { userId: req.user.id },
        attributes: ['id', 'name']
      }]
    });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    // Check if user owns this phonebook
    const phoneBook = await PhoneBook.findOne({
      where: { 
        id: req.body.phonebookId,
        userId: req.user.id
      }
    });
    
    if (!phoneBook) {
      return res.status(404).json({
        success: false,
        error: 'PhoneBook not found or access denied'
      });
    }
    
    const contact = await Contact.create(req.body);
    
    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
exports.updateContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    let contact = await Contact.findOne({
      where: { id: req.params.id },
      include: [{
        model: PhoneBook,
        as: 'phonebook',
        where: { userId: req.user.id }
      }]
    });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found or access denied'
      });
    }
    
    // If phonebookId is being updated, verify user owns the new phonebook
    if (req.body.phonebookId && req.body.phonebookId !== contact.phonebookId) {
      const newPhoneBook = await PhoneBook.findOne({
        where: { 
          id: req.body.phonebookId,
          userId: req.user.id
        }
      });
      
      if (!newPhoneBook) {
        return res.status(404).json({
          success: false,
          error: 'Target PhoneBook not found or access denied'
        });
      }
    }
    
    await contact.update(req.body);
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      where: { id: req.params.id },
      include: [{
        model: PhoneBook,
        as: 'phonebook',
        where: { userId: req.user.id }
      }]
    });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found or access denied'
      });
    }
    
    await contact.destroy();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update lastMessageSent for a contact
// @route   PUT /api/contacts/:id/message
// @access  Private
exports.updateLastMessage = async (req, res) => {
  try {
    let contact = await Contact.findOne({
      where: { id: req.params.id },
      include: [{
        model: PhoneBook,
        as: 'phonebook',
        where: { userId: req.user.id }
      }]
    });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found or access denied'
      });
    }
    
    await contact.update({
      last_message_sent: new Date()
    });
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};