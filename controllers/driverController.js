/*** import models ***/
const Driver = require('../models/driver');

// @desc    View Driver Page
// @route   GET /u/drivers
// @access  Private
const viewDriver = async (req, res) => {
  return res.render('approver/driver', {
    title: 'Kelola Supir'
  });
};

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private
const getDrivers = async (req, res) => {
  const drivers = await Driver.find({});
  res.json(drivers);
};

// @desc    Get driver by ID
// @route   GET /api/drivers/:id
// @access  Private
const getDriverById = async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    return res.json(driver);
  } else {
    return res.status(403).json({ msg: 'Driver not found!' });
  }
};

// @desc    Create new driver
// @route   POST /api/drivers
// @access  Private
const createDriver = async (req, res) => {
  const { name, licenseNumber, phoneNumber } = req.body;

  if (!name || !licenseNumber || !phoneNumber) {
    return res.status(404).json({ msg: 'Please provide all required fields!' });
  }

  const driverExists = await Driver.findOne({ licenseNumber });
  if (driverExists) {
    return res.status(404).json({ msg: 'Driver with this license number already exists' });
  }

  const driver = new Driver({
    name,
    licenseNumber,
    phoneNumber
  });

  const createdDriver = await driver.save();
  return res.status(201).json({ msg: 'Created driver', data: createdDriver });
};

// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Private
const updateDriver = async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    driver.name = req.body.name || driver.name;
    driver.licenseNumber = req.body.licenseNumber || driver.licenseNumber;
    driver.phoneNumber = req.body.phoneNumber || driver.phoneNumber;
    driver.status = req.body.status || driver.status;

    const updatedDriver = await driver.save();
    return res.json({ msg: 'Updated driver', data: updatedDriver });
  } else {
    return res.status(404).json({ msg: 'Driver not found!' });
  }
};

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private
const deleteDriver = async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    await driver.remove();
    return res.json({ msg: 'Driver removed' });
  } else {
    return res.status(403).json({ msg: 'Driver not found!' });
  }
};

module.exports = {
  viewDriver,
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
};
