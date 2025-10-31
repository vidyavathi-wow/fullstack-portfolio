const Preference = require('../models/Preference');

exports.getPreferences = async (req, res) => {
  try {
    const pref = await Preference.findOne({ userId: req.user.id });

    if (!pref) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    res.json(pref);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const updated = await Preference.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, upsert: true } // create if doesn't exist
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
