process.env.NODE_ENV = 'test';

let server = require('../server');
let Camping = require('../app/models/CampingModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Campings', () => {

  beforeEach((done) => {
    Camping.remove({}, (err) => {
      done();
    });
  });

  describe('Get campings', () => {
    it('it should get all the campings', (done) => {
      chai.request(server)
        .get('/v1/camping')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

  });

  describe('Create a camping', () => {
    it('it should return an error: missing camping name', (done) => {
      let camping = {
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should return an error: missing camping phone', (done) => {
      let camping = {
        name: 'An awesome camping',
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should return an error: missing camping email', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should return an error: missing camping address', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should return an error: missing camping location', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should return an error: missing camping location latitude', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lon: -74.00594130000002
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should return an error: missing camping location longitude', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating camping!');
          done();
        });
    });

    it('it should create a camping', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      chai.request(server)
        .post('/v1/camping')
        .send(camping)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Camping successfully created!');
          res.body.camping.should.have.property('name');
          res.body.camping.should.have.property('phone');
          res.body.camping.should.have.property('email');
          res.body.camping.should.have.property('address');
          res.body.camping.should.have.property('location');
          res.body.camping.location.should.have.property('lat');
          res.body.camping.location.should.have.property('lon');
          done();
        })
    });

  });

  describe('Update a camping', () => {

    it('it should update a camping', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      Camping.create(camping, (err, camping) => {
        let campingToUpdate = {
          name: 'A new awesome camping',
          phone: 123456789,
          email: 'info@newawesomecamping.com',
          address: 'Baker Street',
          location: {
            lat: 41.7127837,
            lon: -75.00594130000002
          }
        };
        chai.request(server)
          .put(`/v1/camping/${camping._id}`)
          .send(campingToUpdate)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Camping successfully updated!');
            res.body.camping.should.have.property('name').eql('A new awesome camping');
            res.body.camping.should.have.property('phone').eql('123456789');
            res.body.camping.should.have.property('email').eql('info@newawesomecamping.com');
            res.body.camping.should.have.property('address').eql('Baker Street');
            res.body.camping.should.have.property('location');
            res.body.camping.location.should.have.property('lat').eql('41.7127837');
            res.body.camping.location.should.have.property('lon').eql('-75.00594130000002');
            done();
          });
      });
    });

  });

  describe('Delete a camping', () => {

    it('it should delete a camping', (done) => {
      let camping = {
        name: 'An awesome camping',
        phone: 987654321,
        email: 'info@awesomecamping.com',
        address: 'Elm Street',
        location: {
          lat: 40.7127837,
          lon: -74.00594130000002
        }
      };
      Camping.create(camping, (err, camping) => {
        chai.request(server)
          .delete(`/v1/camping/${camping._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Camping successfully deleted!');
            done();
          });
      });
    });

  });

});