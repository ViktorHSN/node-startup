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

    });



});