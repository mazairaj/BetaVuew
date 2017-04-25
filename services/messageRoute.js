"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const FriendRequest= require('../models/models').FriendRequest;
const Message= require('../models/models').Message;

router.post('/getMessage', function(req, res) {
    Message.find({$or: [
            { $and: [{toUser: req.body.toUserID}, {fromUser: req.body.fromUserID}]},
            {$and: [{toUser: req.body.fromUserID}, {fromUser: req.body.toUserID}] } ]}
          )
    .sort('-dateCreated')
    .exec(
    function(err, user) {
            if (err) {
                return {err, user}
            }
            if (user) {

              return user
            } else {
              console.log('fail in getMyActivitiesInfo! no user')
            }
        })
    }
);

router.post('/getNewlyAddedFriend', function(req, res) {
    console.log('INSIDE GETNEWFRIEND ROUTE', req.body.toUserID);
    User.findById(req.body.toUserID)
    .populate('connections', 'firstName lastName profileImg').exec(
    function(err, user) {
            if (err) {
              console.log(err);
                return {err, user}
            }
            if (user) {
              res.send(user)
              return user
            } else {
              console.log('fail in getMyActivitiesInfo! no user')
              return null
            }
        })
     }
);


router.post('/getLastMessage', function(req, res) {
    Message.findOne({$or: [
            { $and: [{toUser: req.body.toUserID}, {fromUser: req.body.fromUserID}]},
            {$and: [{toUser: req.body.fromUserID}, {fromUser: req.body.toUserID}] } ]}
          )
    .sort('-dateCreated')
    .exec(
    function(err, message) {
            if (err) {
                console.log(err)
                res.send(err)
                return {err, message}
            }
            if (message) {
              console.log(message)
              res.send(message)
              return message
            } else {
              console.log('fail in getMyActivitiesInfo! no user')
              res.send(err)
              return null
            }
        })
    }
);

module.exports = router;
