const express = require('express');
const bodyParser = require('body-parser');


const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
        .then((promotions) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
        .then((promotion) => {
            // console.log('Promotion Created ', dish);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.status(403);
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotions.remove({})
        .then((resp) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));    
});


promoRouter.route('/:id')
.get((req,res,next) => {
    Promotions.findById(req.params.id)
        .then((dish) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
    res.status(403);
    res.end('POST operation not supported on /promotions/'+ req.params.id);
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then((dish) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.id)
        .then((resp) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = promoRouter;