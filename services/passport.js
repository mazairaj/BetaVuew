const passport = require('passport');
const User= require('../models/models').User;

//Facebook Login
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({email: profile.emails[0].value}, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                var fullName = profile.displayName.split(' ');
                var firstName = fullName[0];
                var lastName = fullName[fullName.length - 1];
                user = new models.User({
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.emails[0].value,
                    profileImg: profile.photos ? profile.photos[0].value : 'http://shurl.esy.es/y'
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            }else {
                //found user. Return
                return done(err, user);
            }
        });
  }
));

//Linkedin
passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope:        [ 'r_fullprofile', 'r_emailaddress', 'r_contactinfo']
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile)
    User.findOne({
            email: profile.emails[0].value
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                var fullName = profile.displayName.split(' ');
                var firstName = fullName[0];
                var lastName = fullName[fullName.length - 1];
                user = new models.User({
                    fname: firstName,
                    lname: lastName,
                    email: profile._json.emailAddress,
                    image: profile.photos ? profile.photos[0].value : 'http://shurl.esy.es/y'
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            }else {
                //found user. Return
                return done(err, user);
            }
        });
  }
));
