// Create web serverusing express.js

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); // Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ // Defines the Schema for this database
    Name: String,
    Comment: String,
    Time: String
});

var Comment = mongoose.model('Comment', commentSchema); // Makes an object from that schema as a model

router.post('/comment', function(req, res, next) {
    console.log("POST comment route"); // For debugging purposes only
    console.log(req.body);
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    Comment.find(function(err, commentList) {
        if (err) return console.error(err);
        else {
            console.log(commentList);
            res.json(commentList);
        }
    })
});

module.exports = router; // Makes router available to the rest of the application
