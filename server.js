var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db; //ссылка на бд
var app = express();

app.post('/goods', function (req,res) {
    var good = {
        name: "Milk"
    }
    db.collection('goods').insert(good, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(good);
    })
})

app.get('/', function (req, res) {
    res.send('Hello');
})

app.get('/goods', function(req, res) {
    db.collection('goods').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});

app.get('/goods/:id', function (req, res) {
    db.collection('goods').findOne({_id: ObjectID(req.params.id)}, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})



MongoClient.connect('mongodb://localhost:27017/mgoods', function (err, database) {
    if (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    db = database.db('goods');
    app.listen(3012, function () {
        console.log('Yeeah');
    })
})