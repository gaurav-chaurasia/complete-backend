const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`We will send all the leaders details to you!`);
})
.post((req, res) => {
    res.end(`will add the leader with name: ${req.body.name} and details: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation is not supported on /leaders`);
})
.delete((req, res) => {
    res.end(`Deleting all the leaders!`);
});


leaderRouter.route('/:id')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of leader with id: ${req.params.id} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on /leaders/${req.params.id}`);
})
.put((req, res) => {
    res.write(`updating the leader details with id: ${req.params.id} \n`);
    res.end(`will update the leader_name: ${req.body.name} and details: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting the leader with id: ${req.params.id}`);
});

module.exports = leaderRouter;