var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3300;
var path = require('path');
var fs = require('fs');
var PythonShell = require('python-shell');

var actSockets = 0;
var interval;

/**  
 * 
 * @param {pathFileName,currentData}   
 */ 
function openEDFScript(pathFileName,currentData) { 
    var options = { 
      mode: 'json',
        args: [pathFileName,0] 
    };    
    var readerShell = new PythonShell('/backend/pythonscripts/edfReader.py',options);
    var asyncMessage;
    readerShell.on('message', function (message) {
        console.log(message);    
        asyncMessage = message      
      });    
        
    // end the input stream and allow the process to exit
    readerShell.end(function (err,code,signal) {
        if (err) throw err;  
        console.log(asyncMessage);
        asyncMessage['debug'].command = currentData.debug.command;
        asyncMessage['debug'].fileName = currentData.debug.fileName;
        asyncMessage.debug.time.index=232000;
        asyncMessage.debug.time.currentTime=asyncMessage.debug.time.startTime;
        io.emit("load_edf", asyncMessage);
        console.log('-EC-edfReader-The exit code was: ' + code);
        console.log('-EC-edfReader-The exit signal was: ' + signal);
        console.log('-EC-edfReader-finished');  
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
        io.emit("jump_edf", results[0]);
        return true;
	}); 
}; 

//funciona 8-19-2018
function notchScript(currentData) {
    var options = {
	  mode: 'binary',
	  args: [] 
    };  
    // console.log('-EC-notch_filter-',JSON.stringify(currentData.channels[0]));
    var notchShell = new PythonShell('/backend/pythonscripts/notch.py');

    // esto funciona
    // notchShell.send(JSON.stringify(currentData.channels[0]));
    // ahora enviemos los 20 canales
    notchShell.send(JSON.stringify(currentData.channels));
 
    notchShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
        results={}
        results['channels'] = JSON.parse(message)['channels']
        results['debug'] = currentData.debug;
        results['annotations']=currentData.annotations;
        results['patientInfo']=currentData.patientInfo;
        io.emit("notch_filter", results);  
      }); 
       
    // end the input stream and allow the process to exit
    notchShell.end(function (err,code,signal) {
        //if (err) throw err;
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
    // console.log('-EC-topoPlot-',JSON.stringify(currentData.channels[0]['id']));
    var topoPlotShell = new PythonShell('/backend/pythonscripts/topoplot/topoFilter.py');

    topoPlotShell.send(JSON.stringify(currentData.channels));

    topoPlotShell.on('message', function (message) {
  
      });  
    // end the input stream and allow the process to exit
    topoPlotShell.end(function (err,code,signal) {
        if (err) throw err;
        // lectura desde disco
        fs.readFile(path.join(__dirname, 'temptopo.png'), function(err, buf){
            if (err) throw err;
            // it's possible to embed binary data
            // within arbitrarily-complex objects
            io.emit('topo_plot', { image: true, buffer: buf.toString('base64') });
            console.log('-EC-topoplot-The exit code was: ' + code);
            console.log('-EC-topoplot-The exit signal was: ' + signal);
            console.log('-EC-topoplot-finished'); 
        });
        
    }); 
};


// async function topoPlotScript(currentData) {
//     let options = {
// 	  mode: 'binary',
// 	  args: [] 
//     };   
//     // console.log('-EC-topoPlot-',JSON.stringify(currentData.channels[0]['id']));
//     let topoPlotShell = new PythonShell('/backend/pythonscripts/topoplot/topoFilter.py');

//     let startProcess = await topoPlotShell.send(JSON.stringify(currentData.channels));
//     // let startProcess = await topoPlotShell.on('message', function (message) {});  
//     // end the input stream and allow the process to exit
//     let endProcess = await topoPlotShell.end(function (err,code,signal) {
//         if (err) throw err;
//         return {"code": code, "signal":signal};
//     }); 
//     console.log(endProcess.code);
//     let readImage = await fs.readFile(path.join(__dirname, 'temptopo.png'), (err, data) => {
//         if (err) throw err;
//         return { image: true, buffer: data.toString('base64') };
//     });
//      console.log(readImage);
//     return {
//         code: endProcess.code,
//         signal: endProcess.signal,
//         img:  readImage
//     }
// };
  
/**  
 * 
 * @param {*} currentData  
 */ 
function loretaScript(currentData) { 
    var options = { 
      mode: 'text',      
    //   pythonOptions: ['','','','',''], //own python env flags   
    //   scriptPath : './backend/pythonscripts/loreta-new', 
	  args: ['-l nyL.mat', '-v nyvert.mat', '-f nyface.mat', '-c nyCh.mat', '-d nyEEG_R.txt'] 
    };    
    // python loretaFilter.py -l nyL.mat -v nyvert.mat -f nyface.mat -c nyCh.mat -d nyEEG_R.txt -b ..\..\server_data\sujeto_base.edf
    var loretaShell = new PythonShell('/backend/pythonscripts/loreta-new/loretaFilter.py',options);
    // /backend/pythonscripts/loreta-new/loretaFilter.py
    loretaShell.send(JSON.stringify(currentData.channels));  
    //console.log(currentData.channels);
    var asyncMessage;
    loretaShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        // console.log(message);    
        asyncMessage = message      
      });    
        
    // end the input stream and allow the process to exit
    loretaShell.end(function (err,code,signal) {
        if (err) throw err;  
        io.emit("loreta_filter", JSON.parse(asyncMessage)); 
        //console.log(typeof JSON.parse(asyncMessage));
        console.log('-EC-loretaFilter-The exit code was: ' + code);
        console.log('-EC-loretaFilter-The exit signal was: ' + signal);
        console.log('-EC-loretaFilter-finished');  
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

    socket.on('load_patients', function(msg) {
        console.log('EC-load_patients call',msg.debug);
        //since it is an async call, io.emit should go into the python-shell callback
        let message ={
            'files':[]
        }
        let edfPath='/backend/server_data';
        let joinedPath=path.join(__dirname+edfPath);
        if (!fs.existsSync(__dirname + edfPath)) {
            console.log("-EC-eff- no dir ", edfPath);
        } else {
            console.log(joinedPath)
            fs.readdir(joinedPath, (err, files) =>{
                console.log('files:',files);
                for (let file=0; file<files.length; file++) {
                    message.files.push({
                        'name':files[file],
                        'value':file
                    });
                }
                io.emit("load_patients", message);
            });
        }
    });

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
        console.log("-EC-notch_filter-Start");
        notchScript(msg);
        
    }); 

    socket.on('ocular_filter', function(msg) {
        console.log("-EC-ocular_filter-Start");
        ocularScript(msg);
        
    });




    //no promise
    socket.on('topo_plot', function(msg) {
        console.log("-EC-topo_plot-Start");
        topoPlotScript(msg);
    });
    // with promises
    // socket.on('topo_plot',(msg) => {
    //     console.log("-EC-topo_plot-Start with promises"); 
    //     topoPlotScript(msg).
    //     then(results =>{
    //         console.log('-EC-topoplot-The exit code was: ' + results.code);
    //         console.log('-EC-topoplot-The exit signal was: ' + results.signal);
    //         console.log('-EC-topoplot-finished'); 
    //         io.emit('topo_plot', results.img);
    //     })
    //     .catch(err => console.error(err));
    // });
    
    

    socket.on('loreta_filter', function(msg) {
        console.log("-EC-loreta_filter-Start");
        loretaScript(msg);
        
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


  