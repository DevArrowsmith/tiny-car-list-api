/* eslint-disable no-console */ // TODO:
const { expect } = require('chai');
const request = require('supertest');
const { Listing } = require('../src/models');
const app = require('../src/app');

describe('/listing', () => {
  before(async () => {
    console.log(Listing);
    console.log('mandarin');
    try {
      await Listing.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Listing.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /listings', () => {
    it('creates a new listing in the tinycarindex database', async () => {
      const response = await request(app).post('/listing').send({
        make: 'Coffeeshop',
        model: 'Matcha',
        year: 2010,
        city: 'Liverpool',
        email: 'latte@mock.com',
      });

      await expect(response.status).to.equal(201);
      await expect(response.body.make).to.equal('Coffeeshop');
      await expect(response.body.model).to.equal('Matcha');
      await expect(response.body.year).to.equal(2010);
      await expect(response.body.city).to.equal('Liverpool');
      await expect(response.body.email).to.equal('latte@mock.com');

      const insertedListing = await Listing.findByPk(response.body.id, { raw: true });
      await expect(insertedListing.make).to.equal('Coffeeshop');
      await expect(insertedListing.model).to.equal('Matcha');
      await expect(insertedListing.year).to.equal(2010);
      await expect(insertedListing.city).to.equal('Liverpool');
      await expect(insertedListing.email).to.equal('latte@mock.com');
    });
  });
});
