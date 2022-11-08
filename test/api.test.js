process.env.NODE_ENV = 'test';
const chai = require('chai');
const request = require('supertest');
var app = require('../user.controller'), app=app;
var expect = chai.expect;

describe('Testing API endpoint', function () {
    it("Test Post Request", function(done) {
      request(app)
      .post('/addUser')
      .send({
        name : "moomiiiii",
        password : "Abcd@123",
        profession : "habibi",
        id: 1
      })
      .end(function (err, res) {
          if (err) done(err);
          expect(res.status).to.equal(201);
          expect(res.text).to.equal("User added successfully!")
          done()
      })
 });

it("Test Get Request", function(done) {
  request(app)
  .get('/getUser')
  .query({id:1})
  .end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('Object');
      done()
  })
  });

  it("Test Delete Request", function(done) {
    request(app)
    .delete('/deleteUser')
    .query({id:1})
    .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Successfully deleted record.");
        done()
    })
  });
});
