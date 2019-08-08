const routes = require("express").Router();

const SessionController = require("./controllers/SessionController");

const auth = require('./middleware/auth');

routes.get("/", (req, res) => {
    res.send("Hello Nodemon World").status(200);
});

routes.post('/sessions', SessionController.store);

routes.use(auth);

//ALL routes below requires authentication

routes.get('/dashboard', (req, res) => {
    res.status(200).send();
});

module.exports = routes;