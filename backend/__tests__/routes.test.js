//routes.test.js
const request = require('supertest');
const server = require('../app.js');
beforeAll(async () => {
 // do something before anything else runs
 console.log('Jest starting!');
});
// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');
});
describe('basic route tests', () => {
 test('login POST /', async () => {
 const response = await request(server).post('/user/login').send({"email" : "o@gmail.com", "password" : "mypass"});
 expect(response.status).toEqual(200);
 console.log(JSON.stringify(response));
 //expect(response.text).toContain('Hello World!');
 });
});