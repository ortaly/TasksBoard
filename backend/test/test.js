const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;


var token;

describe('Login API', function () {
    it('Should success if credential is valid', function (done) {
        this.timeout(10000);
        request(app)
            .post('/user/login')
            .send({ "email": "o@gmail.com", "password": "mypass" })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                token = response.body.token;
                // console.log('cookie=', token)
                expect(response.body).not.to.be.empty;
            })
            .end(function (err, res) {
                if (err) done(err);
                done();
            })
    });
    it('should success if get the boards', function (done) {
        request(app)
            .get('/user/boards')
            .set('x-access-token', token)
            .expect(200)
            .end(function (err, res) {
                console.log('boards length:', res.body.length);
                if (err) done(err);
                done();
            })
    });
});


