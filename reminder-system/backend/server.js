require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Appointment routes
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);
const appointmentRoutes = require('./routes/appointments');


// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is defined
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined. Check your .env file.');
  process.exit(1);
}
console.log("MONGO_URI is:", MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
