const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize, connectDB } = require('./config/db');

// Load env vars
dotenv.config();

// Route files
const phoneBookRoutes = require('./routes/phoneBookRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Body parser
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cors());

// Mount routers
app.use('/api/phonebooks', phoneBookRoutes);
app.use('/api/contacts', contactRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('SMS Management API is running');
});

// Sync database and create tables
const syncDatabase = async () => {
  try {
    await connectDB();
    
    // Sync all defined models to the DB
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
};

syncDatabase();

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});