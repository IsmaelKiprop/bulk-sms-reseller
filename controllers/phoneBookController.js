const { PhoneBook, Contact } = require('../models/index');
const { validationResult } = require('express-validator');


exports.getPhoneBooks = async (req, res) => {
  try {
    const phoneBooks = await PhoneBook.findAll({
      where: { userId: req.user.id }
    });
    
    res.status(200).json({
      success: true,
      count: phoneBooks.length,
      data: phoneBooks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.getPhoneBook = async (req, res) => {
  try {
    const phoneBook = await PhoneBook.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!phoneBook) {
      return res.status(404).json({
        success: false,
        error: 'PhoneBook not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: phoneBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.createPhoneBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const phoneBook = await PhoneBook.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: phoneBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.updatePhoneBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const phoneBook = await PhoneBook.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!phoneBook) {
      return res.status(404).json({
        success: false,
        error: 'PhoneBook not found'
      });
    }
    
    await phoneBook.update(req.body);
    
    res.status(200).json({
      success: true,
      data: phoneBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.deletePhoneBook = async (req, res) => {
  try {
    const phoneBook = await PhoneBook.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!phoneBook) {
      return res.status(404).json({
        success: false,
        error: 'PhoneBook not found'
      });
    }
    
    await phoneBook.destroy();
    
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


exports.getPhoneBookContacts = async (req, res) => {
  try {
    const phoneBook = await PhoneBook.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!phoneBook) {
      return res.status(404).json({
        success: false,
        error: 'PhoneBook not found'
      });
    }
    
    const contacts = await Contact.findAll({
      where: { phonebookId: req.params.id }
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