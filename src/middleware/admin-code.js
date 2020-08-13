const adminCode = (req, res, next) => {
  const adminCodeCheck = req.get('Authorizer');
  if (adminCodeCheck !== process.env.ADMIN_CODE) {
    res.status(401).json({ error: 'incorrect admin code' });
  } else {
    next();
  }
};

module.exports = adminCode;
