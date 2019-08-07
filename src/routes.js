const routes = require("express").Router();

const SessionController = require("./controllers/SessionController");

routes.get("/", (req, res) => {
    res.send("Hello Nodemon World").status(200);
});

routes.post('/sessions', SessionController.store);

module.exports = routes;