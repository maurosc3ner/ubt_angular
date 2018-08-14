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

function openEDFScript(filename) {
    //Aqui va llamado a rutina de python
    //TODO
    console.log('-EC-openEDFScript- calling python edfReader.py');
    var options = {
	  mode: 'json',
	  args: [filename,0] 
	};
    PythonShell.run('/backend/pythonscripts/edfReader.py', options, function (err, results) {
		if (err) console.log(err);
	  // results is an array consisting of messages collected during execution
	  	// write only for dev
	  	// fs.writeFile ("output.json", JSON.stringify(results[0]), function(err) {
		  //   if (err) console.log(err);
	   //  	console.log('lecture complete');
	   //  });
        console.log('-EC-openEDFScript- end of exec edfReader');
        results[0].debug.time.index=0;
        results[0].debug.time.currentTime=results[0].debug.time.startTime;
        console.log(results[0].debug);
        console.log('-EC-openEDFScript- updating time object [index, currentTime]');
        io.emit("load_edf", results[0]);
        console.log('-EC-openEDFScript- response to client...');
        return true;
	});
};

function jumpEDFScript(filename,time) {
    //Aqui va llamado a rutina de python
    //TODO
    console.log('-EC-jumpEDFScript- calling python edfReader.py');
    var options = {
	  mode: 'json',
	  args: [filename,time.index,10] 
	};
    PythonShell.run('/backend/pythonscripts/edfNavigator.py', options, function (err, results) {
		if (err) console.log(err);
        console.log('-EC-jumpEDFScript- end of exec edfReader');
       
        console.log(results[0].debug);
        io.emit("load_edf", results[0]);
        console.log('-EC-jumpEDFScript- response to client...');
        return true;
	});
};

/// recursive for filesearch in directories
// function fromDir(startPath, filter) {
//     console.log("startPath: ",startPath);
//     var results = [];
//     if (!fs.existsSync(__dirname + startPath)) {
//         console.log("no dir ", startPath);
//         //return;
//     } else {
//         console.log("exist ", startPath);
//     }

//     var files = fs.readdirSync(__dirname+startPath);
//     console.log(files);
//     for (var i = 0; i < files.length; i++) {
//         var filename = path.join(__dirname+startPath, files[i]);
//         var stat = fs.lstatSync(filename);
//         if (stat.isDirectory()) {
//             console.log("is a dir ...recursing");
//             fromDir(startPath+'/'+files[i], filter); //recurse
//         } else if (filter.test(filename)) {
//             //fileFound(filename);
//             console.log("File found "+filename);
//             break;
//         } else console.log("File not found");
//     };
// };

function edfFromFile(startPath, file, debug) {
    console.log("-EC-eff- startPath: ",startPath);
    var results = [];
    if (!fs.existsSync(__dirname + startPath)) {
        console.log("-EC-eff- no dir ", startPath);
        //return;
    } else {
        console.log("-EC-eff- exist ", startPath);
        var filename = path.join(__dirname+startPath, file);
        console.log('-EC-eff- file found: ', filename);
        if (debug.command == "load_edf")
            return openEDFScript(filename);
        else if (debug.command == "jump_edf")
            return jumpEDFScript(filename,debug.time);
    }
};

io.on('connection', function(socket) {
    actSockets++;
    console.log('a user connected');

    socket.on('load_edf', function(msg) {

        console.log(msg.debug);
        //var re = new RegExp(msg.debug.fileName);
        //fromDir('./test',/\.edf$/,function(filename)
        //since it is an async call, io.emit should go into the python-shell callback
        if (!edfFromFile('/backend/server_data', msg.debug.fileName,msg.debug))
            console.log('-EC-lf- ups something happen');
        
    });

    socket.on('jump_edf', function(msg) {

        console.log(msg.debug);
        
        if (!edfFromFile('/backend/server_data', msg.debug.fileName))
            console.log('-EC-lf- ups something happen');
        
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