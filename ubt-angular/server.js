var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3300;
var path = require('path');
var fs = require('fs');
var PythonShell = require('python-shell');

var actSockets = 0;
var interval;
var shell;

function fileFound(filename) {
    console.log('-- found: ', filename);
    //Aqui va llamado a rutina de python
    //TODO
    console.log('-- calling python edfReader.py');
    var options = {
	  mode: 'json',
	  args: [filename]
	};
    PythonShell.run('/backend/pythonscripts/edfReader.py', options, function (err, results) {
		if (err) console.log(err);
	  // results is an array consisting of messages collected during execution
	  	// write only for dev
	  	// fs.writeFile ("output.json", JSON.stringify(results[0]), function(err) {
		  //   if (err) console.log(err);
		    
	   //  	console.log('lecture complete');
	   //  });
	    console.log('-- end of exec edfReader');
	    io.emit("load_edf", results[0]);
	    console.log('-- response to client...');
	});
};

function fromDir(startPath, filter) {
    var results = [];
    //console.log('Starting from dir '+startPath+'/'+filter);

    if (!fs.existsSync(__dirname + '/backend/server_data')) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filter.test(filename)) {
            fileFound(filename);
            break;
        } else console.log("File not found");
    };
};

io.on('connection', function(socket) {
    actSockets++;
    console.log('a user connected');
    socket.on('load_edf', function(msg) {
        var re = new RegExp(msg.fileName);
        //fromDir('./test',/\.edf$/,function(filename){
        fromDir('./backend/server_data', re);
        response = {
            "command": "load_edf",
            "status": "ERR: file not found",
            "origin": "UBT Server",
            "type": "RESP",
            "subrecords": [] //A list of available subrecords labels.
        }
        console.log(msg);
        
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('stop_transfer', function(msg) {
        response = {
            "status": "grabacion detenida"
        }
        console.log(msg);
        clearInterval(interval);
        io.emit("stop_transferBack", response);
    });

    socket.on('request_subrecords', function(msg) {
        console.log(msg);
        interval = setInterval(function() {
            response = {
                "type": "DISP",
                "origin": "PYCOLLECT",
                "command": "request_subrecords",
                "datetime": 1530894200,
                "channels": [], //A dictionary with the subrecords label and their respective measure.
            }
            response.channels.push({
                'label': 'F1',
                'data': [{
                    'value': Math.random() * 10
                }]
            });
            response.channels.push({
                'label': 'C1',
                'data': [{
                    'value': Math.random() * 6
                }]
            });
            console.log("emitiendo");
            io.emit("subrecordsBack", response);
        }, 1000);
    });

});

var express = require('express');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3300');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use(
    express.static(path.join(__dirname, '/dist/ubt-angular'))
);
  
app.get('*', function(req, res, next) {
  res.sendFile(__dirname+"/dist/ubt-angular/index.html");
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});