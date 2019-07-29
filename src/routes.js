const routes = require("express").Router();
const {
    User
} = require("./models");

routes.get("/", async (req, res) => {
    res.send("Hello Nodemon World").status(500);
});

routes.get("/teste", (req, res) => {
    res.send(`hello nodemon test, how are you?`).status(200);
});

routes.get("/createUser", async (req, res) => {
    try {
        const user = await User.create({
            name: "Victor",
            email: "12345@12345.com",
            password_hash: "123456"
        });

        res.send(user).status(200);
    } catch (err) {
        res.send({
            msg: err.message
        }).status(500);
    }
});

module.exports = routes;