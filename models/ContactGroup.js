const mongoose = require('mongoose');

const ContactGroupSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
}, {
  timestamps: true
});

// Create a compound index to ensure a contact is only added to a group once
ContactGroupSchema.index({ contactId: 1, groupId: 1 }, { unique: true });

module.exports = mongoose.model('ContactGroup', ContactGroupSchema);