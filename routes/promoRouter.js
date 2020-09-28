const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`We will send all the promotions to you!`);
})
.post((req, res) => {
    res.end(`will add the promotions: ${req.body.name} with details: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation is not supported on /promotions`);
})
.delete((req, res) => {
    res.end(`Deleting all the promotions!`);
});


promoRouter.route('/:id')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of promotion: ${req.params.id} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on /promotions/${req.params.id}`);
})
.put((req, res) => {
    res.write(`updating the promo: ${req.params.id} \n`);
    res.end(`will update the promotions: ${req.body.name} with details: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting the promotion with promotion_id: ${req.params.id}`);
});

module.exports = promoRouter;