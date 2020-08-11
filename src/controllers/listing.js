const { Listing } = require('../models');

exports.create = (req, res) => {
  console.log(req.body);
  Listing.create(req.body).then((response) => res.status(201).json(response));
};
