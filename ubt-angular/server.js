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

function openEDFScript(pathFileName,debug) {
    //Aqui va llamado a rutina de python
    //TODO
    console.log('-EC-openEDFScript- calling python edfReader.py');
    var options = {
	  mode: 'json',
	  args: [pathFileName,0] 
	};
    PythonShell.run('/backend/pythonscripts/edfReader.py', options, function (err, results) {
		if (err) console.log(err);
        console.log('-EC-openEDFScript- end of exec edfReader',debug,results[0]['debug']);
        results[0]['debug'].command = debug.command;
        results[0]['debug'].fileName = debug.fileName;
        results[0].debug.time.index=0;
        results[0].debug.time.currentTime=results[0].debug.time.startTime;
        console.log('-EC-openEDFScript- updating time object [index, currentTime]',results[0].debug);
        io.emit("load_edf", results[0]);
        console.log('-EC-openEDFScript- response to client...');
        return true;
	});
};

function jumpEDFScript(filename,debug) {
    //Aqui va llamado a rutina de python
    //TODO
    console.log('-EC-jumpEDFScript- calling python edfNavigator.py');
    var options = {
	  mode: 'json',
	  args: [filename,debug.time.index,10] 
	};
    PythonShell.run('/backend/pythonscripts/edfNavigator.py', options, function (err, results) {
		if (err) console.log(err);
        console.log('-EC-jumpEDFScript- end of exec edfNavigator',debug,results[0]['debug']);
        results[0]['debug'].command = debug.command;
        results[0]['debug'].fileName = debug.fileName;
        results[0]['debug']['time'] = {};
        results[0]['debug']['time']['index'] = debug.time.index;
        results[0].debug.time.startTime=debug.time.startTime;
        results[0].debug.time.currentTime=debug.time.startTime+debug.time.index;
        
        io.emit("jump_edf", results[0]);
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

function edfFromFile(startPath, debug) {
   
    var results = [];
    if (!fs.existsSync(__dirname + startPath)) {
        console.log("-EC-eff- no dir ", startPath);
        //return;
    } else {
        console.log("-EC-edfFromFile- exist ", startPath);
        var builtFilename = path.join(__dirname+startPath, debug.fileName);
        console.log('-EC-edfFromFile- file found: ', builtFilename);
        if (debug.command == "load_edf")
            return openEDFScript(builtFilename,debug);
        else if (debug.command == "jump_edf")
            return jumpEDFScript(builtFilename,debug);
    }
};

io.on('connection', function(socket) {
    actSockets++;
    console.log('a user connected');

    socket.on('load_edf', function(msg) {

        console.log(msg.debug);
        //since it is an async call, io.emit should go into the python-shell callback
        if (!edfFromFile('/backend/server_data',msg.debug))
            console.log('-EC-lf- ooops something happen');
        
    });

    socket.on('jump_edf', function(msg) {

        console.log(msg.debug);
        
        if (!edfFromFile('/backend/server_data', msg.debug))
            console.log('-EC-lf- ooops something happen');
        
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