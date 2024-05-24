/*** import module ***/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

/*** import models ***/
const User = require('../models/user');

// @desc    View register page
// @route   GET /auth/login
// @access  Private
const viewRegister = async (req, res) => {
  return res.render('auth/register', {
    title: 'Daftar'
  });
};

// @desc    Handle user register
// @route   POST /api/auth/register
// @access  Private
const register = async (req, res) => {
  const { name, username, password, role } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(401).json({ msg: 'User has been registered!' });
    }
    const newUser = new User({ name, username, password: bcrypt.hashSync(password, 10), role });
    await newUser.save();
    return res.status(201).json({ msg: 'User is successfully registered', redirect_uri: '/auth/login' });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

// @desc    View login page
// @route   GET /auth/login
// @access  Private
const viewLogin = async (req, res) => {
  return res.render('auth/login', {
    title: 'Masuk'
  });
};

// @desc    Handle user login
// @route   POST /api/auth/login
// @access  Private
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      logger.info(`Failed login attempt for username: ${username}`);
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    logger.info(`User logged in: ${username}`);
    req.session.auth = user;
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: '1d' });
    return res.json({ token, msg: 'Successfuly login', redirect_uri: '/u/dashboard' });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    return res.status(400).json({ msg: err.message });
  }
};

// @desc    Logout user
// @route   GET /auth/logout
// @access  Private
const logout = async (req, res) => {
  req.session.destroy();
  return res.redirect('/auth/login');
};

module.exports = {
  viewRegister,
  viewLogin,
  register,
  login,
  logout
};
