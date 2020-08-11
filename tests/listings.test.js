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

  describe('with listings in the tinycarindex database', () => {
    let listings;
    beforeEach(async (done) => {
      await Listing.create({
        make: 'Chroma',
        model: 'Chartreuse',
        year: 2011,
        city: 'Sheffield',
        email: 'mapplefordd@imdb.com',
      });
      await Listing.create({
        make: 'Kawaii',
        model: 'Panda',
        year: 2013,
        city: 'Sheffield',
        email: 'aaugustus1j@aol.com',
      });
      await Listing.create({
        make: 'Vista',
        model: 'Reykjavik',
        year: 1996,
        city: 'Leeds',
        email: 'kbeertv@weather.com',
      });
      await ((listingData) => {
        listings = listingData;
      });
      done();
    });

    describe('GET /listings', () => {
      it('gets all listings', (done) => {
        request(app)
          .get('/artists')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((listing) => {
              const expected = listings.find((a) => a.id === listing.id);
              expect(listing.make).to.equal(expected.make);
              expect(listing.model).to.equal(expected.model);
            });
            done();
          });
      });
    });
  });
});
