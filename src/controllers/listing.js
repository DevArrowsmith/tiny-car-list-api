const { Listing } = require('../models');

exports.create = (req, res) => {
  Listing.create(req.body).then((response) => res.status(201).json(response));
};

exports.getAll = (req, res) => {
  Listing.findAll().then((listingsData) => {
    res.status(200).json(listingsData);
  });
};
