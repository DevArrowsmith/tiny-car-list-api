# TinyCarList Back-End 🌉

## Background

This application is a full-stack automobile trading site.  
The application is spread between two repositories. This repo contains the back-end. The front-end can be found [here](https://github.com/DevArrowsmith/tiny-car-list-app).  
The back-end is hosted on [Heroku](https://dashboard.heroku.com/). The front-end is hosted on [GitHub Pages](https://devarrowsmith.github.io/tiny-car-list-app/#/).

---

## Motivation

I wanted to create a full-stack trading application with a database of items for sale. I wanted to include images of merchandise but this raised the issue of ensuring images were appropriately formatted to display well in resusable components.

I decided to create a listings site for automobiles, using pictures of toy cars in place of real cars. I discovered several collectors' sites that included images of Hotwheels cars in a standardised format, allowing me to generate a large pool of assets that could be rendered in procedurally generated components with minimal formatting issues.

I aimed to include the following features in the back-end:
- A MySQL database of listings data
- An API created using Express and Sequelize
- Full CRUD capabilities
- A test suite for the CRUD methods

The features of the front-end are detailed [here](https://github.com/DevArrowsmith/tiny-car-list-app).

---

## Installation

To install this repo locally:
1. [Clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this [repo](https://github.com/DevArrowsmith/tiny-car-list-api).
2. Set up a [Docker](https://www.docker.com/) container running MySQL. Set the password to `password`.
3. Create a .env file in the root directory.
4. Add the following environment variables to the .env file:
    ``` 
    DB_NAME=tiny_car_list
    DB_USER=root
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=3307
    ADMIN_CODE=password
    ```
5. Create a .env.test file in the root directory.
6. Add the following environment variables to the .env.test file:
    ```
    DB_NAME=tiny_car_list_test
    DB_USER=root
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=3307
    ADMIN_CODE=password
    ```
7. To run the tests, run `npm test`. In the unaltered repo they should pass.
8. If all tests pass then the API can be run. Run `npm start`.
9. Launch [Postman](https://www.postman.com/) to interact with the API.

---

## Interacting with the API

The live API is password-protected and will only accept Get requests without the password.  
However various requests can be sent to the locally hosted API using the password `password` as specified in the Installation section above.  
In Postman add a key of 'Authorizer' with value 'password' to the Headers. This password will then be included with your requests.


### Create a Listing (POST)
EFFECT: Creates a new listing with the provided JSON data.  
METHOD: POST to `localhost:4000/listing`  
BODY: 
``` 
{  
  "imgref": "car000_#",  
  "make": "coffeeshop",  
  "model": "matcha",  
  "year": "2010",  
  "price": "1000",  
  "city": "liverpool",  
  "email": "latte@mock.com"  
}
```  


### Fetch All Listings (GET)

EFFECT: Fetches all listings in the database.  
METHOD: GET to `localhost:4000/listing`  

###  Fetch Specific Listings by Query (GET)

EFFECT: Fetch all listings that match a specified query  
METHOD: GET to `localhost:4000/listing?key=value`
EXAMPLE: `GET localhost:4000/listing?year=2010`


### Modify a Listing (PATCH)

EFFECT: Identifies a listing using its listingId and modifies values specified in the body. Remaining values are unchanged.  
METHOD: PATCH to `localhost:4000/listing/id`  
EXAMPLE: `PATCH localhost:4000/listing/2`  
BODY: 
``` 
{  
  "make": "patisserie",  
  "model": "latte",  
  "year": "2017",  
  "city": "paris",  
}
```  

### Delete a Listing (DELETE)
EFFECT: Deletes a listing using its listingId.  
METHOD: DELETE to `localhost:4000/listing/id`  
EXAMPLE: `DELETE localhost:4000/listing/2`  

---

## Framework

The API was created using [Express](https://github.com/expressjs/express) and [Sequelize](https://github.com/sequelize/sequelize).   
[Dotenv](https://github.com/motdotla/dotenv) was used to manage environment variables.  
I used the [Mocha](https://github.com/mochajs/mocha) test framework, [Chai](https://github.com/chaijs/chai) assertion library and [Supertest](https://github.com/visionmedia/supertest) asynchronous request library to create the test suite.

---

## Next Steps

- Create a process for uploading images with new submissions to the database. Images are hosted separately from the rest of the database so a new approach will be required for this.

---

## Credits

This application uses Open Source components. You can find their source code and license information below. Huge thanks to all of the people who contribute to this work ❤️

- Project: [Express](https://github.com/expressjs/express)  
  Copyright (c) 2009-2014 TJ Holowaychuk  
  Copyright (c) 2013-2014 Roman Shtylman  
  Copyright (c) 2014-2015 Douglas Christopher Wilson  
  License: [MIT](https://github.com/facebook/react/blob/master/LICENSE)

- Project: [Sequelize](https://github.com/sequelize/sequelize)  
  Copyright (c) 2014-present Sequelize contributors  
  License: [MIT](https://github.com/sequelize/sequelize/blob/main/LICENSE)

- Project: [Dotenv](https://github.com/motdotla/dotenv)  
  Copyright (c) 2015, Scott Motte  
  License: [BSD 2-Clause](https://github.com/motdotla/dotenv/blob/master/LICENSE)

- Project: [Chai](https://github.com/chaijs/chai)  
  Copyright (c) 2017 Chai.js Assertion Library  
  License: [MIT](https://github.com/chaijs/chai/blob/master/LICENSE)

- Project: [Mocha](https://github.com/mochajs/mocha)  
  Copyright (c) 2011-2021 [OpenJS Foundation and contributors](https://openjsf.org)   
  License: [MIT](https://github.com/mochajs/mocha/blob/master/LICENSE)

- Project: [Supertest](https://github.com/visionmedia/supertest)  
  Copyright (c) 2014 TJ Holowaychuk  
  License: [MIT](https://github.com/visionmedia/supertest/blob/master/LICENSE)