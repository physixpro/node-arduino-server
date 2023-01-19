var http = require('http');
var fs = require('fs');
var live = fs.readFileSync( 'app.js');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort("COM7",{ 
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);


var io = require('socket.io').listen(app);




io.on('connection', function(socket) {
    console.log(socket)
    io.on('data', function (data) {console.log(data)});
    
  
    console.log('Node is listening to port');
    
});




var liveDataLink = ("")
parser.on('data', function(data) {
    console.log('Received data from port: ' + data);
    io.emit('data', data);
    liveDataLink = data;

   
});

var app = http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    res.end(JSON.stringify(liveDataLink))
    // res.end(JSON.stringify(
    //     {
    //       "albumId": 1,
    //       "id": 1,
    //       "title": "This is hardest bug ever",
    //       "url": "www.fixthisbug.com",
    //       "thumbnailUrl": "https://bughub.com"
    //     },
    //     {
    //       "albumId": 1,
    //       "id": 2,
    //       "title": "What is going on here",
    //       "url": "https://clueless.com/justkidding",
    //       "thumbnailUrl": "stuff"
    //     }));
    
});



app.listen(3001);
