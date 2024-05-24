/*** import module ***/
const express = require('express');
const router = express.Router();

/*** import controller ***/
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const bookingController = require('../controllers/bookingController');
const vehicleController = require('../controllers/vehicleController');
const driverController = require('../controllers/driverController');

/*** import middleware ***/
const middleware = require('../middleware');

/*** router ***/
router.get('/auth/register', authController.viewRegister);
router.get('/auth/login', authController.viewLogin);
router.get('/auth/logout', authController.logout);

router.get('/', middleware.auth, dashboardController.index);
router.get('/u/dashboard', middleware.auth, dashboardController.viewDashboard);
router.get('/u/history', middleware.auth, userController.viewHistory);
router.get('/u/booking-vehicle', middleware.auth, userController.viewBookingVehicle);

router.get('/u/bookings', middleware.approver, bookingController.viewBooking);
router.get('/u/vehicles', middleware.approver, vehicleController.viewVehicle);
router.get('/u/drivers', middleware.approver, driverController.viewDriver);

router.get('/u/report', middleware.approver, dashboardController.viewReport);

module.exports = router;
