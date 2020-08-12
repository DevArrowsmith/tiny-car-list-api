const adminCode = (req, res, next) => {
  const adminCode = req.get('Authorizer');
  if (adminCode !== process.env.ADMIN_CODE) {
    res.status(401).json({ error: 'incorrect admin code' });
  } else {
    next();
  }
};

module.exports = adminCode;