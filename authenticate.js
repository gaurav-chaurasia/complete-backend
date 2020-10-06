const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


/**
 * @authenticate , @serializeUser , and @deserializeUser are provided on User model by 
 * use of  "passport-local-mongoose" 
*/
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());