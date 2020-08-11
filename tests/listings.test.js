const { expect } = require('chai');
const request = require('supertest');
const { Listing } = require('../src/models');
const app = require('../src/app');

describe('/listing', () => {
  before(async () => {
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

      expect(response.status).to.equal(201);
      expect(response.body.make).to.equal('Coffeeshop');
      expect(response.body.model).to.equal('Matcha');
      expect(response.body.year).to.equal(2010);
      expect(response.body.city).to.equal('Liverpool');
      expect(response.body.email).to.equal('latte@mock.com');

      const insertedListing = await Listing.findByPk(response.body.id, { raw: true });
      expect(insertedListing.make).to.equal('Coffeeshop');
      expect(insertedListing.model).to.equal('Matcha');
      expect(insertedListing.year).to.equal(2010);
      expect(insertedListing.city).to.equal('Liverpool');
      expect(insertedListing.email).to.equal('latte@mock.com');
    });
  });

  describe('with listings in the tinycarindex database', () => {
    let listings;

    beforeEach(async () => {
      listings = await Promise.all([
        Listing.create({
          make: 'Chroma',
          model: 'Chartreuse',
          year: 2011,
          city: 'Sheffield',
          email: 'mapplefordd@imdb.com',
        }),
        Listing.create({
          make: 'Kawaii',
          model: 'Panda',
          year: 2013,
          city: 'Sheffield',
          email: 'aaugustus1j@aol.com',
        }),
        Listing.create({
          make: 'Vista',
          model: 'Reykjavik',
          year: 1996,
          city: 'Leeds',
          email: 'kbeertv@weather.com',
        }),
      ]);
    });

    describe('GET /listings', () => {
      it('gets all listings', async () => {
        const res = await request(app).get('/listing');
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);
        res.body.forEach((listing) => {
          const expected = listings.find((l) => l.id === listing.id);
          expect(listing.make).to.equal(expected.make);
          expect(listing.model).to.equal(expected.model);
        });
      });
    });
  });
});
