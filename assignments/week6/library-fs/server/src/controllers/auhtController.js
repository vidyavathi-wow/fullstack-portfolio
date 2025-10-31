const bcrypt = require('bcrypt');
const db = require('../utils/db');
const jwt = require('jsonwebtoken');
const Preference = require('../models/Preference');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '1h';

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';
const REFRESH_EXPIRES_IN = '7d';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password)
      return res
        .status(422)
        .json({ success: false, message: 'Email & password required' });

    const existing = await db('users').where({ email }).first();
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db('users')
      .insert({ email, password: hashedPassword, name })
      .returning(['id', 'email', 'name', 'created_at']);

    await Preference.create({
      userId: user.id,
      theme: 'light',
      language: 'en',
      notifications: { email: true, push: true },
    });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      user,
      token,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(422)
        .json({ success: false, message: 'Email & password required' });

    const user = await db('users').where({ email }).first();
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password' });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    const preferences = await Preference.findOne({ userId: user.id });

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: { id: user.id, email: user.email, name: user.name },
      preferences,
      token,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = async (req, res) => {
  return res.json({
    success: true,
    message: 'Logged out. Discard your token on client.',
  });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res
      .status(401)
      .json({ success: false, message: 'Refresh token required' });

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = { id: payload.id, email: payload.email };
    const token = generateToken(user);

    return res.json({ success: true, token });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};
