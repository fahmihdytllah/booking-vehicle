/*** import models ***/
const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Driver = require('../models/driver');
const Booking = require('../models/booking');

// @desc    Redirect index
// @route   GET /
// @access  Private
const index = (req, res) => {
  return res.redirect('/u/dashboard');
};

// @desc    View dashboard admin/aprover
// @route   GET /u/dashboard
// @access  Private
const viewDashboard = (req, res) => {
  if (req.auth.role === 'admin') {
    return res.render('admin/dashboard', {
      title: 'Dasbor Admin'
    });
  } else {
    return res.render('approver/dashboard', {
      title: 'Dasbor Approver'
    });
  }
};

// @desc    Get data booking, dll
// @route   GET /api/dashboard-approver
// @access  Private
const getDashboardDataApprover = async (req, res) => {
  try {
    const dataBooking = await Booking.find({});
    const dataVehicle = await Vehicle.find({});
    const totalDrivers = await Driver.countDocuments({});
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    let bookingRatio = {};
    let vehicleStatistics = {};

    dataBooking.forEach(booking => {
      let status = booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase();
      if (bookingRatio[status] === undefined) {
        bookingRatio[status] = 0;
      }
      bookingRatio[status] += 1;
    });

    dataVehicle.forEach(vehicle => {
      let name = vehicle.name.charAt(0).toUpperCase() + vehicle.name.slice(1).toLowerCase();
      if (vehicleStatistics[name] === undefined) {
        vehicleStatistics[name] = 0;
      }
      vehicleStatistics[name] += 1;
    });

    return res.json({
      status: true,
      totalBookings: dataBooking.length,
      totalVehicles: dataVehicle.length,
      totalDrivers,
      totalAdmins,
      bookingRatio: {
        labels: Object.keys(bookingRatio),
        series: Object.values(bookingRatio)
      },
      vehicleStatistics: {
        labels: Object.keys(vehicleStatistics),
        series: Object.values(vehicleStatistics)
      }
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

// @desc    Get data booking user
// @route   GET /api/dashboard-admin
// @access  Private
const getDashboardDataAdmin = async (req, res) => {
  try {
    const dataBooking = await Booking.find({ user: req.auth._id });
    let bookings = {
      pending: 0,
      approved: 0,
      rejected: 0
    };

    dataBooking.forEach(booking => {
      bookings[booking.status] += 1;
    });

    return res.json({
      status: true,
      totalBookings: dataBooking.length,
      pendingBookings: bookings.pending,
      approvedBookings: bookings.approved,
      rejectedBookings: bookings.rejected
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

// @desc    Get report booking
// @route   GET /u/report
// @access  Private
const viewReport = async (req, res) => {
  return res.render('approver/report', {
    title: 'Laporan Pemesanan'
  });
};

// @desc    Get report booking
// @route   GET /api/report
// @access  Private
const getDataReport = async (req, res) => {
  const bookings = await Booking.find({}).populate('vehicle').populate('user').populate('approvers');
  return res.json({ data: bookings });
};

module.exports = {
  index,
  viewDashboard,
  viewReport,
  getDashboardDataApprover,
  getDashboardDataAdmin,
  getDataReport
};
