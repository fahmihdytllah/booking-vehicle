/*** import models ***/
const User = require('../models/user');
const Booking = require('../models/booking');

// @desc    View booking vehicle
// @route   GET /u/booking-vehicle
// @access  Private
const viewBookingVehicle = async (req, res) => {
  return res.render('admin/booking', {
    title: 'Pemesanan Kendaraan'
  });
};

// @desc    View history user
// @route   GET /u/history
// @access  Private
const viewHistory = async (req, res) => {
  const bookings = await Booking.find({}).populate('vehicle').populate('user').populate('driver').populate('approvers');
  return res.render('admin/history', {
    title: 'Riwayat Pesanan',
    dataBookings: bookings
  });
};

// @desc    Get all Approver
// @route   GET /api/users
// @access  Private
const getApprover = async (req, res) => {
  const users = await User.find({ role: 'approver' });
  return res.json(users);
};

module.exports = {
  viewBookingVehicle,
  viewHistory,
  getApprover
};
