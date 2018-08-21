var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3300;
var path = require('path');
var fs = require('fs');
var PythonShell = require('python-shell');


var actSockets = 0;
var interval;

function openEDFScript(pathFileName,currentData) {
    //Aqui va llamado a rutina de python
    //TODO
    //console.log('-EC-openEDFScript- calling python edfReader.py');
    var options = {
	  mode: 'json',
	  args: [pathFileName,232000] 
	};
    PythonShell.run('/backend/pythonscripts/edfReader.py', options, function (err, results) {
		if (err) console.log(err);
        console.log('-EC-openEDFScript- end of exec edfReader',currentData.debug,results[0]['debug']);
        results[0]['debug'].command = currentData.debug.command;
        results[0]['debug'].fileName = currentData.debug.fileName;
        results[0].debug.time.index=232000;
        results[0].debug.time.currentTime=results[0].debug.time.startTime;
        //console.log('-EC-openEDFScript- updating time object [index, currentTime]',results[0].debug);
        //console.log([results[0].channels[0].data[0],results[0].channels[0].data[20]]);
        //console.log(results[0].patientInfo);
        
        io.emit("load_edf", results[0]);
        console.log('-EC-openEDFScript- response to client...');
        return true;
	});
};

function jumpEDFScript(filename,currentData) {
    //Aqui va llamado a rutina de python
    //TODO
    //console.log('-EC-jumpEDFScript- calling python edfNavigator.py');
    var options = {
	  mode: 'json',
	  args: [filename,currentData.debug.time.index,10] 
	};
    PythonShell.run('/backend/pythonscripts/edfNavigator.py', options, function (err, results) {
		if (err) console.log(err);
        console.log('-EC-jumpEDFScript- end of exec edfNavigator',currentData.debug,results[0]['debug']);
        results[0]['debug'] = currentData.debug;
        results[0].debug.time.currentTime=currentData.debug.time.startTime+currentData.debug.time.index;
        results[0]['annotations']=currentData.annotations;
        results[0]['patientInfo']=currentData.patientInfo;
        console.log(currentData.patientInfo);
        
        //console.log([results[0].channels[0].data[0],results[0].channels[0].data[20]]);
        io.emit("jump_edf", results[0]);
        console.log('-EC-jumpEDFScript- response to client...');
        return true;
	});
};
  

//funciona 8-19-2018
function notchScript(currentData) {
    var options = {
	  mode: 'binary',
	  args: [] 
    };  
    //console.log('-EC-notch_filter-',JSON.stringify(currentData.channels[0]));
    var notchShell = new PythonShell('/backend/pythonscripts/notch.py');

    // esto funciona
    // notchShell.send(JSON.stringify(currentData.channels[0]));
    // ahora enviemos los 20 canales
    notchShell.send(JSON.stringify(currentData.channels));

    notchShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        // console.log(message);
        results={}
        results['channels'] = JSON.parse(message)['channels']
        results['debug'] = currentData.debug;
        results['annotations']=currentData.annotations;
        results['patientInfo']=currentData.patientInfo;
        io.emit("notch_filter", results);  
      }); 
       
    // end the input stream and allow the process to exit
    notchShell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('-EC-notch_filter-The exit code was: ' + code);
        console.log('-EC-notch_filter-The exit signal was: ' + signal);
        console.log('-EC-notch_filter-finished');
    });
};

function ocularScript(currentData) {
    var options = {
	  mode: 'binary',
	  args: [] 
    };  
    var ocularShell = new PythonShell('/backend/pythonscripts/ocularArtifact/ocularFilter.py');
    ocularShell.send(JSON.stringify(currentData.channels));

    ocularShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        //console.log(message);
        results={}
        results['channels'] = JSON.parse(message)['channels']
        results['debug'] = currentData.debug;
        results['annotations']=currentData.annotations;
        results['patientInfo']=currentData.patientInfo;
        io.emit("ocular_filter", results);   
      }); 
       
    // end the input stream and allow the process to exit
    ocularShell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('-EC-ocular_filter-The exit code was: ' + code);
        console.log('-EC-ocular_filter-The exit signal was: ' + signal);
        console.log('-EC-ocular_filter-finished');
    });
};

// este debe ser el topoplot
function topoPlotScript(currentData) {
    var options = {
	  mode: 'binary',
	  args: [] 
    };  
    //console.log('-EC-notch_filter-',JSON.stringify(currentData.channels[0]));
    var topoPlotShell = new PythonShell('/backend/pythonscripts/topoplot/topoFilter.py');

    topoPlotShell.send(JSON.stringify(currentData.channels));

    topoPlotShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
         console.log(message);
        // results={}   
        // results['channels'] = JSON.parse(message)['channels']
        // results['debug'] = currentData.debug;
        // results['annotations']=currentData.annotations;
        // results['patientInfo']=currentData.patientInfo;
        // io.emit("notch_filter", results);  
      }); 

    // end the input stream and allow the process to exit
    topoPlotShell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('-EC-topoplot-The exit code was: ' + code);
        console.log('-EC-topoplot-The exit signal was: ' + signal);
        console.log('-EC-topoplot-finished'); 
    });
};

function edfFromFile(startPath, msg) {
   
    var results = [];
    if (!fs.existsSync(__dirname + startPath)) {
        console.log("-EC-eff- no dir ", startPath);
        //return;
    } else {
        console.log("-EC-edfFromFile- exist ", startPath);
        var builtFilename = path.join(__dirname+startPath, msg.debug.fileName);
        console.log('-EC-edfFromFile- file found: ', builtFilename);
        if (msg.debug.command == "load_edf")
            return openEDFScript(builtFilename,msg);
        else if (msg.debug.command == "jump_edf")
            return jumpEDFScript(builtFilename,msg);
    }
};

io.on('connection', function(socket) {
    actSockets++;
    console.log('a user connected');

    socket.on('load_edf', function(msg) {
        console.log(msg.debug);
        //since it is an async call, io.emit should go into the python-shell callback
        if (!edfFromFile('/backend/server_data',msg))
            console.log('-EC-lf- ooops something happen');
        
    });

    socket.on('jump_edf', function(msg) {
        //este funciona
        if (!edfFromFile('/backend/server_data', msg))
            console.log('-EC-lf- ooops something happen');
        
    });

    socket.on('notch_filter', function(msg) {
        console.log("-EC-notch_filter- ");
        notchScript(msg);
        
    });

    socket.on('ocular_filter', function(msg) {
        console.log("-EC-ocular_filter- ");
        ocularScript(msg);
        
    });

    socket.on('topo_plot', function(msg) {
        console.log("-EC-topo_plot- ");
        topoPlotScript(msg);
        
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


  