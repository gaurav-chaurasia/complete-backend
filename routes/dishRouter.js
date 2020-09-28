const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res) => {
    res.end(`willl add the dish: ${req.body.name} with details: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation is not supported on /dishes`);
})
.delete((req, res) => {
    res.end(`Deleting all the dishes!`);
});


dishRouter.route('/:id')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of dish: ${req.params.id} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on /dishes/${req.params.id}`);
})
.put((req, res) => {
    res.write(`updating the dish: ${req.params.id} \n`);
    res.end(`will update the dish: ${req.body.name} with details: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting the dish with dish_id: ${req.params.id}`);
});


module.exports = dishRouter;