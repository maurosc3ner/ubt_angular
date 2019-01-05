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
 * Read EDF file - load_edf
 * @param {string} pathFileName - edf file location
 * @param {Object} currentData - edf object structure *optional  
 * @param {number} index - Where to start in the file
 * @param {number} visWindow - timeframe to retrieve in seconds
 */ 
function openEDFScript(pathFileName,currentData, index, visWindow) { 
    var options = { 
      mode: 'json',
        args: [pathFileName,index,visWindow] 
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
        asyncMessage.debug.time.index+=asyncMessage.debug.time.samplefrequency*visWindow;
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

/**  
 * notch executer, eturns a promise
 * @param {Object} currentData edf object structure 
 * @returns {Promise} PythonShell execution of notch filter
 */ 
function myNotchExecuter(currentData) {
    return new Promise(function (resolve, reject) {
        let options = {
            mode: 'binary',
            args: [] 
          };  
        let results={};
        let notchShell = new PythonShell('/backend/pythonscripts/notch.py');
        // como es mucha informacion no se puede enviar por parametros sino por estandar input, en este caso options no es necesario
        // notchShell.send(JSON.stringify(currentData.channels[0]));
        // ahora enviemos los 20 canales
        notchShell.send(JSON.stringify(currentData.channels));
    
        notchShell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
            results['channels'] = JSON.parse(message)['channels']
            results['debug'] = currentData.debug;
            results['annotations']=currentData.annotations;
            results['patientInfo']=currentData.patientInfo;
        }); 
        // end the input stream and allow the process to exit
        notchShell.end(function (err,code,signal) {
        // if (err) reject(err); se comenta porque es un warning que esta como error david debe revisar
        // Error: C:\Anaconda3\lib\site-packages\scipy\signal\_arraytools.py:45: FutureWarning: Using a non-tuple sequence for multidimensional indexing is
        // deprecated; use `arr[tuple(seq)]` instead of `arr[seq]`. In the future this will be interpreted as an array index, `arr[np.array(seq)]`, which will result either in an error or a different result.
        //   b = a[a_slice]
            resolve ({r: results, c: code, s: signal});
        });
    });
}

/**  
 * Notch Script V2 full error handling and async await
 * @param {currentData}   
 */ 
async function notchScript(currentData) {
    let execution= await myNotchExecuter(currentData);
    return ({
        c: execution.c,
        s: execution.s,
        r: execution.r
    });
};  


// //funciona 8-19-2018
/**  
 * V1 notch executer 
 * @param {currentData}   
 */ 
// function notchScript(currentData) {
//     var options = {
// 	  mode: 'binary',
// 	  args: [] 
//     };  
//     // console.log('-EC-notch_filter-',JSON.stringify(currentData.channels[0]));
//     var notchShell = new PythonShell('/backend/pythonscripts/notch.py');

//     // esto funciona
//     // notchShell.send(JSON.stringify(currentData.channels[0]));
//     // ahora enviemos los 20 canales
//     notchShell.send(JSON.stringify(currentData.channels));
 
//     notchShell.on('message', function (message) {
//         // received a message sent from the Python script (a simple "print" statement)
//         console.log(message);
//         results={}
//         results['channels'] = JSON.parse(message)['channels']
//         results['debug'] = currentData.debug;
//         results['annotations']=currentData.annotations;
//         results['patientInfo']=currentData.patientInfo;
//         io.emit("notch_filter", results);  
//       }); 
       
//     // end the input stream and allow the process to exit
//     notchShell.end(function (err,code,signal) {
//         //if (err) throw err;
//         console.log('-EC-notch_filter-The exit code was: ' + code);
//         console.log('-EC-notch_filter-The exit signal was: ' + signal);
//         console.log('-EC-notch_filter-finished');
//     });
// };  

/**  
 * ocular artifact executer, eturns a promise
 * @param {Object} currentData edf object structure 
 * @returns {Promise} PythonShell execution of ocular filter
 */ 
function myOcularExecuter(currentData) {
    return new Promise(function (resolve, reject) {
        var options = {
            mode: 'binary',
            args: [] 
        };  
        let results ={};
        var ocularShell = new PythonShell('/backend/pythonscripts/ocularArtifact/ocularFilter.py');
        ocularShell.send(JSON.stringify(currentData.channels));
        ocularShell.on('message', function (message) {
            results['channels'] = JSON.parse(message)['channels']  
            results['debug'] = currentData.debug;
            results['annotations']=currentData.annotations;
            results['patientInfo']=currentData.patientInfo;
        });  
        // end the input stream and allow the process to exit
        ocularShell.end(function (err,code,signal) {
            if (err) reject(err);
            resolve ({r: results, c: code, s: signal});
        });
    });
}

/**  
 * Ocular Script V2 full error handling and async await
 * @param {currentData}   
 */ 
async function ocularScript(currentData) {
    let execution= await myOcularExecuter(currentData);
    return ({
        c: execution.c,
        s: execution.s,
        r: execution.r
    });
};

/**  
 * async png file reader 
 * @param {string} path - file location
 * @returns {Promise} result - Promise with the buffer file
 */ 
function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
}

/**  
 * topoplot executer, returns a promise
 * @param {Object} currentData - edf object structure 
 * @returns {Promise} PythonShell execution of topoplot filter
 */ 
function myTopoExecuter(currentData) {
    return new Promise(function (resolve, reject) {
        var options = {
            mode: 'binary',
            args: [] 
        };   
        var topoPlotShell = new PythonShell('/backend/pythonscripts/topoplot/topoFilter.py');
        topoPlotShell.send(JSON.stringify(currentData.channels));
        topoPlotShell.on('message',(message) => {
        });  
        topoPlotShell.end((err,code,signal) => {
            if (err) reject(err);
            console.log(code,signal);
            resolve ({c: code, s: signal});
        }); 
    });
}

/**  
 * Topoplot V2 full error handling and async await
 * @param {currentData}   
 */ 
async function topoPlotScript(currentData) {
    let execution= await myTopoExecuter(currentData);
    let topoFileBuffer = await readFileAsync(path.join(__dirname, 'temptopo.png'));
    return ({
        c: execution.c,
        s: execution.s,
        b: topoFileBuffer
    });
};
  

/**  
 * async loreta executer generalization 
 * @param {currentData}   
 */ 
function myLoretaExecuter(currentData) {
    return new Promise(function (resolve, reject) {
        let options = { 
            mode: 'text',
            args: ['-l nyL.mat', '-v nyvert.mat', '-f nyface.mat', '-c nyCh.mat', '-d nyEEG_R.txt'] 
        };
        let loretaShell = new PythonShell('/backend/pythonscripts/loreta-new/loretaFilter.py',options);
        let results={};
        // channels are sent through stdin as text for avoid string limits
        loretaShell.send(JSON.stringify(currentData.channels));  
        loretaShell.on('message',(message) => { 
            results = message      
        });
        loretaShell.end((err,code,signal) =>{
            if (err) reject(err);
            resolve ({r: results, c: code, s: signal});
        });
    });
}

/**  
 * Loreta V2 full error handling and async await
 * @param {*} currentData  
 */ 
async function loretaScript(currentData) { 
    let execution= await myLoretaExecuter(currentData);
    return ({
        c: execution.c,
        s: execution.s,
        r: execution.r
    });
}; 

// loreta V1 que funciona 03-01-2019
// function loretaScript(currentData) { 
//     var options = { 
//       mode: 'text',      
//     //   pythonOptions: ['','','','',''], //own python env flags   
//     //   scriptPath : './backend/pythonscripts/loreta-new', 
// 	  args: ['-l nyL.mat', '-v nyvert.mat', '-f nyface.mat', '-c nyCh.mat', '-d nyEEG_R.txt'] 
//     };    
//     // python loretaFilter.py -l nyL.mat -v nyvert.mat -f nyface.mat -c nyCh.mat -d nyEEG_R.txt -b ..\..\server_data\sujeto_base.edf
//     var loretaShell = new PythonShell('/backend/pythonscripts/loreta-new/loretaFilter.py',options);
//     // /backend/pythonscripts/loreta-new/loretaFilter.py
//     loretaShell.send(JSON.stringify(currentData.channels));  
//     //console.log(currentData.channels);
//     var asyncMessage;
//     loretaShell.on('message', function (message) {
//         // received a message sent from the Python script (a simple "print" statement)
//         // console.log(message);    
//         asyncMessage = message      
//       });    
        
//     // end the input stream and allow the process to exit
//     loretaShell.end(function (err,code,signal) {
//         if (err) throw err;  
//         io.emit("loreta_filter", JSON.parse(asyncMessage)); 
//         //console.log(typeof JSON.parse(asyncMessage));
//         console.log('-EC-loretaFilter-The exit code was: ' + code);
//         console.log('-EC-loretaFilter-The exit signal was: ' + signal);
//         console.log('-EC-loretaFilter-finished');  
//     });
// }; 

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
            return openEDFScript(builtFilename,msg,0,10);
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

    // //old version working 04-01-2019
    // socket.on('load_edf', function(msg) {
    //     console.log(msg.debug);
    //     //since it is an async call, io.emit should go into the python-shell callback
    //     if (!edfFromFile('/backend/server_data',msg))
    //         console.log('-EC-lf- ooops something happen');
    // });

    //async version
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
        notchScript(msg)
        .then(results=>{
            console.log('-EC-notch_filter-The exit code was: ' + results.c);
            console.log('-EC-notch_filter-The exit signal was: ' + results.s);
            io.emit("notch_filter", results.r);  
            console.log('-EC-notch_filter-finished');
        })
        .catch(err=>{console.log("notch err ",err)});
    }); 

    socket.on('ocular_filter', function(msg) {
        console.log("-EC-ocular_filter-Start");
        ocularScript(msg)
        .then((results)=>{
            console.log('-EC-ocular_filter-The exit code was: ' + results.c);
            console.log('-EC-ocular_filter-The exit signal was: ' + results.s);
            io.emit("ocular_filter", results.r);   
            console.log('-EC-ocular_filter-finished'); 
        })
        .catch(err=>{console.log("topoplot err ",err)});
    });

    socket.on('topo_plot', function(msg) {
        console.log("-EC-topo_plot-Start");
        topoPlotScript(msg)
        .then((results)=>{
            console.log('-EC-topoplot-The exit code was: ',results.c);
            console.log('-EC-topoplot-The exit signal was: ',  results.s);
            io.emit('topo_plot', { image: true, buffer: results.b.toString('base64') });
            console.log('-EC-topoplot-finished');
        })
        .catch(err=>{console.log("topoplot err ",err)});
    });

    socket.on('loreta_filter', function(msg) {
        console.log("-EC-loreta_filter-Start");
        loretaScript(msg)
        .then((results)=>{
            console.log('-EC-loretaFilter-The exit code was: ',results.c);
            console.log('-EC-loretaFilter-The exit signal was: ',results.s);
            io.emit("loreta_filter", JSON.parse(results.r)); 
            console.log('-EC-loretaFilter-finished');  
        })
        .catch(err=>{console.log("loreta err ",err)});;
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