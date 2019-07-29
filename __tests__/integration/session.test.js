const {
    User
} = require('../../src/models');

describe('Authentication', () => {

    it("should create user", async () => {

        console.log(process.env.NODE_ENV);

        const user = await User.create({
            name: "Rodolfo",
            email: "rras@cin.ufpe.br",
            password_hash: "123456"
        });

        console.log(user);

        expect(user.email).toBe("rras@cin.ufpe.br");
    });



});