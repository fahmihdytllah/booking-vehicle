/*** import models ***/
const Vehicle = require('../models/vehicle');

// @desc    Get all vehicles
// @route   GET /u/vehicles
// @access  Private
const viewVehicle = async (req, res) => {
  return res.render('approver/vehicle', {
    title: 'Kelola Kendaraan'
  });
};

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({});
  return res.json(vehicles);
};

// @desc    Get vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Private
const getVehicleById = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    return res.json(vehicle);
  } else {
    return res.status(403).json({ msg: 'Vehicle not found!' });
  }
};

// @desc    Create new vehicle
// @route   POST /api/vehicles
// @access  Private
const createVehicle = async (req, res) => {
  const { name, type, licensePlate, thumbnail, description } = req.body;

  if (!name || !type || !licensePlate) {
    return res.status(403).json({ msg: 'Please complete form!' });
  }

  const vehicle = new Vehicle({
    name,
    thumbnail,
    description,
    type,
    licensePlate
  });

  const createdVehicle = await vehicle.save();
  return res.status(201).json({ msg: 'Created vehicle', data: createdVehicle });
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private
const updateVehicle = async (req, res) => {
  const { name, type, licensePlate, status, thumbnail, description } = req.body;

  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    vehicle.name = name || vehicle.name;
    vehicle.type = type || vehicle.type;
    vehicle.licensePlate = licensePlate || vehicle.licensePlate;
    vehicle.status = status || vehicle.status;
    vehicle.thumbnail = thumbnail || vehicle.thumbnail;
    vehicle.description = description || vehicle.description;

    const updatedVehicle = await vehicle.save();
    return res.json({ msg: 'Updated vehicle', data: updatedVehicle });
  } else {
    return res.status(403).json({ msg: 'Vehicle not found!' });
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
const deleteVehicle = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    await vehicle.remove();
    return res.json({ msg: 'Vehicle removed' });
  } else {
    return res.status(403).json({ msg: 'Vehicle not found!' });
  }
};

module.exports = {
  viewVehicle,
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};
