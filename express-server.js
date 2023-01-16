
var http = require('http');
const express = require('express')
const cors = require('cors')
// const app = express()
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

const SerialPort = require('serialport')
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});


const listen = new SerialPort("COM7", {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

listen.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// app.get('http://localhost:3001/', async(req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(index);
//     res.send("GET Request Called")
//     res.json("Does this even work?")
// })
// const io = require('socket.io').listen(app);
// io.onconnection('connection', function(socket) {
//     console.log('Node is listening to port');
// })

parser.on('data', function(data){
    console.log('Received data from port: ' + data);
    console.log(data);
    // io.emit('data',data)
    console.log(data)
})



const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on port ${port}...`))
