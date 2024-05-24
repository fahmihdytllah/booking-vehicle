/*** import module ***/
const express = require('express');
const router = express.Router();

/*** import controller ***/
const { register, login } = require('../controllers/authController');
const { getApprover } = require('../controllers/userController');
const { getDashboardDataApprover, getDashboardDataAdmin, getDataReport } = require('../controllers/dashboardController');
const { getBookings, getBookingById, createBooking, approveBooking, rejectBooking } = require('../controllers/bookingController');
const { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver } = require('../controllers/driverController');

/*** import middleware ***/
const middleware = require('../middleware');

/*** router ***/
router.post('/auth/register', register);
router.post('/auth/login', login);

router.get('/dashboard-approver', middleware.auth, getDashboardDataApprover);
router.get('/dashboard-admin', middleware.auth, getDashboardDataAdmin);

router.get('/approvers', middleware.auth, getApprover);

router.route('/bookings').get(middleware.auth, getBookings).post(middleware.auth, createBooking);
router.route('/bookings/:id').get(middleware.approver, getBookingById);
router.route('/bookings/:id/approve').post(middleware.approver, approveBooking);
router.route('/bookings/:id/reject').post(middleware.approver, rejectBooking);

router.route('/vehicles').get(middleware.auth, getVehicles).post(middleware.approver, createVehicle);
router.route('/vehicles/:id').get(middleware.approver, getVehicleById).put(middleware.approver, updateVehicle).delete(middleware.approver, deleteVehicle);

router.route('/drivers').get(middleware.auth, getDrivers).post(middleware.approver, createDriver);
router.route('/drivers/:id').get(middleware.approver, getDriverById).put(middleware.approver, updateDriver).delete(middleware.approver, deleteDriver);

router.get('/report', middleware.auth, getDataReport);

module.exports = router;
