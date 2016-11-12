var http = require('http');
var connect = require('connect');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');

function get(path, cb){
    return function(req, res ,next){
        if(req.method != 'GET' || req.url != path) return next();
        cb(req, res, next);
    }
}


var app = connect()
    .use(get('/', function (req, res, next){
        fs.readFile('./app.html', 'utf8', function(error, data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
    }))
    .use(logger())
    .use(connect.static('./'))
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(function(req, res){
        res.end(JSON.stringify(req.body));
    });




http.createServer(app).listen(8000);


