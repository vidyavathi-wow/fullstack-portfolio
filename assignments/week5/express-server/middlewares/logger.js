const logger = async (req, res, next) => {
  try {
    console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
    next();
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = logger;
