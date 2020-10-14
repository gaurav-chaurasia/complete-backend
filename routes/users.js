const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');

const User = require('../models/user');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => {
	User.find({})
	.then((users) => {
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		res.json(users);
	}, (err) => next(err))
	.catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
	User.register(new User({username: req.body.username, gender: req.body.gender}), req.body.password, (err, user) => {
		if(err) {
			res.status(500);
			res.setHeader('Content-Type', 'application/json');
			res.json({err: err});
		}
		else {
			passport.authenticate('local')(req, res, () => {
				res.status(200);
				res.setHeader('Content-Type', 'application/json');
				res.json({success: true, status: 'Registration Successful!'});
			});
		}
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {

	let token = authenticate.getToken({_id: req.user._id})
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, status: 'You are Successfully logged in!'});
});

router.get('/logout', (req, res, next) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	}
	else {
		var err = new Error('You are not logged in!');
		err.status = 403;
		next(err);
	}
});


module.exports = router;
