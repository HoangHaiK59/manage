// var http = require('http');
// var url = require('url');
// var querystring= require('querystring');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Content-type', 'application/json')
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

const logger = (req, res, next) => {
    console.log('url', req.url);
    console.log('method', req.method);
    console.log('time', req.requestTime);
    next();
}

app.use(requestTime, logger);

//const MongoClient = require('mongodb').MongoClient;
var password = encodeURIComponent('hoanghai');
//const uri = `mongodb+srv://hai:${password}@cluster0-rc67p.mongodb.net/facebook?retryWrites=true&w=majority`;
const uri = `mongodb://hai:${password}@cluster0-shard-00-00-rc67p.mongodb.net:27017,cluster0-shard-00-01-rc67p.mongodb.net:27017,cluster0-shard-00-02-rc67p.mongodb.net:27017/facebook?ssl=true`.replace(/\\/g, "\\\\");
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
// client.connect(err => {
//   const collection = client.db("facebook").collection("creative");
//   // perform actions on the collection object
//   console.log(collection)
//   client.close();
// });

//const uri = "mongodb+srv://admin:admin@cluster0-rc67p.mongodb.net/facebook?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(uri, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, useCreateIndex: true, 
    serverSelectionTimeoutMS: 5000, 
    replicaSet: 'cluster0-shard-0', 
    authSource: 'admin',
    useFindAndModify: true })
    .then(console.log('connected'))
    .catch(err => console.log(err.reason))

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connected')
// });

var creativeSchema = new mongoose.Schema({
    id: String,
    message: String,
    type: String,
    create_at: { type: Date, default: Date.now }
});

var Creative = mongoose.model('Creative', creativeSchema, 'creative');



// var server = http.createServer(function(req,res){
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
//     res.setHeader('Content-type', 'application/json')
//     var params = querystring.parse(url.parse(req.url).query);
//     var page = url.parse(req.url).pathname;
//     console.log(page);
//     res.writeHead(200, {"Content-Type": "application/json"});
//     if(page === '/') {
//         res.write('You\'re at the reception desk. How can I help you?');
//     }else if(page=== '/unpublish') {
//         if(req.method === 'POST') {
//             res.write('You\'re at the unpublish')
//             console.log(res.config.data.params)
//             var creative = new Creative(res.dsad);
//             creative.save(err => {
//                 if(err) console.log(err);
//                 // save
//             })
//         }
//     }else if(page === 'schedule') {
//         res.write('You\'re in schedule');
//     }
//     res.end();
// });

// server.listen(8000, function(){
//     console.log('app listen at port 8000');
// });

app.get('/', function (req, res) {
    res.send('<h1>Welcome</h1>')
})

app.post('/v1/unpublish/new', function (req, res) {
    console.log(req.body);
    var unpublish = {
        ...req.body.params.unpublish,
        id: Number(req.body.params.unpublish.id).toString()
    }
    var creative = new Creative(unpublish);
    creative.save(err => {
        if (err) { console.log(err); res.status(400).send({ success: false }) }
        // save
        res.send({ success: true })
    });
})

app.get('/v1/unpublishes', function (req, res) {

    Creative.find({ type: 'unpublish' }, function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'data error' })
        } else {
            Creative.count({ type: 'unpublish' }, function (err, count) {
                if (err) console.log(err);
                res.send({ docs: docs, count: count })
            })
        }
    })
})

app.delete('/v1/unpublishes', function (req, res) {

    console.log(req.query.id);

    Creative.deleteOne({id: req.query.id}, function(err, doc){
        if(err) {
            res.status(400).send({})
        }else {
            res.send({
                success: true
            })
        }
    })
})

app.delete('/v1/unpublishes', function (req, res) {

    console.log(req);

    Creative.deleteMany({type: req.query.type}, function(err, doc){
        if(err) {
            res.status(400).send({})
        }else {
            res.send({
                success: true
            })
        }
    })
})

app.listen(8000, function () {
    console.log('App listent at port 8000');
})