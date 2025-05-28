const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  channel: {
    type: String,
    enum: ['sms', 'whatsapp'],
    default: 'sms',
  },
  notified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

// This code defines a Mongoose schema for an appointment in a healthcare application.
// It includes fields for patient name, doctor name, phone number, appointment date, channel of communication (SMS or WhatsApp), and a notification status.
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  channel: { type: String, enum: ['sms', 'whatsapp', 'email'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
