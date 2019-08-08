const request = require('supertest');

const app = require('../../src/app');

const {
    User
} = require('../../src/models');

const truncate = require('../utils/truncate');


describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {

        const user = await User.create({
            name: "Victor",
            email: "agahagah@gmail.com",
            password: "123456"
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456'
        });



        expect(response.status).toBe(200);

    });

    it('should fail when logging in with invalid password', async () => {

        const user = await User.create({
            name: "Victor",
            email: "agahagah@gmail.com",
            password: "123456"
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123'
        });

        expect(response.status).toBe(401);


    });

    it('should fail when wrong email is provided', async () => {
        const user = await User.create({
            name: "Victor",
            email: "agahagah@gmail.com",
            password: "123456"
        });

        const response = await request(app).post('/sessions').send({
            email: "agagagaga@agaga.com",
            password: '123456'
        });

        expect(response.status).toBe(401);
    });

    it('should return jwt when authenticated', async () => {
        const user = await User.create({
            name: "Victor",
            email: "agahagah@gmail.com",
            password: "123456"
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456'
        });

        console.log(response.body.token);

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to acess private routes when authenticated', async () => {
        const user = await User.create({
            name: "Victor",
            email: "agahagah@gmail.com",
            password: "123456"
        });

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);


    });

    it('should not be able to acess private routes when token not provided', async () => {

        const response = await request(app).get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('should not be able to acess private routes with invalid token', async () => {

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer a5wd4ac16aw5da32c1a65w4dea32s1d6aw4.5a5df6a4d65w4a6`);

        expect(response.status).toBe(401);

    });



});