// controllers/contactGroupController.js
const Contact = require('../models/Contact');
const Group = require('../models/Group');
const ContactGroup = require('../models/ContactGroup');

// @desc    Add a contact to a group
// @route   POST /api/contacts/:id/groups/:groupId
// @access  Private
exports.addContactToGroup = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }
    
    // Check if relationship already exists
    const existingRelation = await ContactGroup.findOne({
      contactId: req.params.id,
      groupId: req.params.groupId
    });
    
    if (existingRelation) {
      return res.status(400).json({
        success: false,
        error: 'Contact is already in this group'
      });
    }
    
    // Create relationship
    const contactGroup = await ContactGroup.create({
      contactId: req.params.id,
      groupId: req.params.groupId
    });
    
    res.status(201).json({
      success: true,
      data: contactGroup
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Remove a contact from a group
// @route   DELETE /api/contacts/:id/groups/:groupId
// @access  Private
exports.removeContactFromGroup = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }
    
    // Find and delete the relationship
    const contactGroup = await ContactGroup.findOneAndDelete({
      contactId: req.params.id,
      groupId: req.params.groupId
    });
    
    if (!contactGroup) {
      return res.status(404).json({
        success: false,
        error: 'Contact is not in this group'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};