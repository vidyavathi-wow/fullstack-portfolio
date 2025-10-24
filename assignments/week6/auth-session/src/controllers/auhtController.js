const bcrypt = require('bcrypt');
const db = require('../utils/db');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password)
      return res
        .status(422)
        .json({ success: false, message: 'email & password required' });

    const existing = await db('users').where({ email }).first();
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);

    const [user] = await db('users')
      .insert({ email, password_hash, name })
      .returning(['id', 'email', 'name', 'created_at']);

    req.session.user = { id: user.id, email: user.email };

    return res.status(201).json({ success: true, message: 'Registered', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(422)
        .json({ success: false, message: 'email & password required' });

    const user = await db('users').where({ email }).first();
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    const matched = await bcrypt.compare(password, user.password_hash);
    if (!matched)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password' });

    req.session.user = { id: user.id, email: user.email };

    return res.status(200).json({
      success: true,
      message: 'Logged in',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out' });
  });
};
