const { Listing } = require('../models');

exports.create = (req, res) => {
  Listing.create(req.body).then((response) => res.status(201).json(response));
};

exports.get = (req, res) => {
  Listing.findAll({ where: req.query }).then((listingsData) => {
    if (!listingsData.length) {
      res.status(404).json({ error: 'Your search returned no results.' });
    } else {
      res.status(200).json(listingsData);
    }
  });
};

exports.update = (req, res) => {
  Listing.update(req.body, { where: { id: req.params.listingId } }).then(
    (body) => {
      if (body[0]) {
        res.status(200).json(body);
      } else {
        res.status(404).json({ error: 'This listing could not be found.' });
      }
    },
  );
};
