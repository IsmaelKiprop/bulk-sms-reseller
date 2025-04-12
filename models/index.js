// models/index.js
const { sequelize } = require('../config/db');
const PhoneBook = require('./PhoneBook');
const Contact = require('./Contact');

// Define associations
PhoneBook.hasMany(Contact, { 
  foreignKey: 'phonebook_id', 
  as: 'contacts',
  onDelete: 'CASCADE' 
});

Contact.belongsTo(PhoneBook, { 
  foreignKey: 'phonebook_id', 
  as: 'phonebook' 
});

module.exports = {
  sequelize,
  PhoneBook,
  Contact
};