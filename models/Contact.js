const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
    allowNull: false
  },
  phonebookId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'phonebook_id',
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  last_message_sent: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'contacts',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Contact;