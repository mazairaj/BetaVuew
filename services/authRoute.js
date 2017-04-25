"use strict";
var express = require('express');
var router = express.Router();

const User= require('../models/models').User;

// TODO: message
//Get User get the conversation of each connection.
router.post('/facebookAuth', function(req, res) {
    // req.body.id
    console.log('EMAIL', req.body.result)
    var profile = req.body.result
    User.findOne({email: profile.email})
    .populate('activities', 'activityTitle activityImages timeStart timeEnd')
    .exec(function(err, user) {
            if (err) {
                return {err, user}
            }
            if (!user) {
                var Name = profile.name.toString().split(' ');
                var firstName = Name[0];
                var lastName = Name[Name.length - 1];
                var newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.email,
                    age: profile.age_range.min,
                    gender: profile.gender,
                    bio: profile.about,
                    profileImg: profile.picture ? profile.picture.data.url : 'http://shurl.esy.es/y'
                });
                newUser.save(function(err) {
                    if (err) console.log(err);
                    res.send(user)
                    return {err, user}
                });
            } else {
              res.send(user)
              return user
            }
        });
});

// TODO: Linkedin
router.post('/linkedinAuth', function(req, res) {
    // req.body.id

});

// TODO: return Current user
router.get('/getCurrentUser', function(req, res) {
  console.log('FINDING CURRENT USER')
    User.findOne({_id: req.body.userID}, function(err, user) {
            if (err) {
                return {err, user}
            }
            if (user) {
                return user
            } else {
              console.log("cannot find user");
              return null
            }
        });
});

// TODO: Edit an user
router.post('/editUser', function(req, res) {
    // req.body.id
    User.findOneAndUpdate({_id: req.body.id}, req.body.data, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
    });

});

module.exports = router;
//Facebook Login
// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'name', 'photos', 'email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOne({email: profile.emails[0].value}, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 var fullName = profile.displayName.split(' ');
//                 var firstName = fullName[0];
//                 var lastName = fullName[fullName.length - 1];
//                 user = new models.User({
//                     firstName: firstName,
//                     lastName: lastName,
//                     email: profile.emails[0].value,
//                     profileImg: profile.photos ? profile.photos[0].value : 'http://shurl.esy.es/y'
//                 });
//                 user.save(function(err) {
//                     if (err) console.log(err);
//                     return done(err, user);
//                 });
//             }else {
//                 //found user. Return
//                 return done(err, user);
//             }
//         });
//   }
// ));

// //Linkedin
// passport.use(new LinkedInStrategy({
//     consumerKey: LINKEDIN_API_KEY,
//     consumerSecret: LINKEDIN_SECRET_KEY,
//     callbackURL: "http://localhost:3000/auth/linkedin/callback",
//     scope:        [ 'r_fullprofile', 'r_emailaddress', 'r_contactinfo']
//   },
//   function(token, tokenSecret, profile, done) {
//     console.log(profile)
//     User.findOne({
//             email: profile.emails[0].value
//         }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 var fullName = profile.displayName.split(' ');
//                 var firstName = fullName[0];
//                 var lastName = fullName[fullName.length - 1];
//                 user = new models.User({
//                     fname: firstName,
//                     lname: lastName,
//                     email: profile._json.emailAddress,
//                     image: profile.photos ? profile.photos[0].value : 'http://shurl.esy.es/y'
//                 });
//                 user.save(function(err) {
//                     if (err) console.log(err);
//                     return done(err, user);
//                 });
//             }else {
//                 //found user. Return
//                 return done(err, user);
//             }
//         });
//   }
// ));
