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
 * read Script V2 full error handling and async await
 * @param {currentData}   
 */ 
function myReadExecuter(pathFileName,currentData, index, visWindow) { 
    return new Promise(function (resolve, reject) {
        let options = { 
            mode: 'json',
            args: [pathFileName,index,visWindow] 
        };    
        let readerShell = new PythonShell('/backend/pythonscripts/edfReader.py',options);
        let results={};
        readerShell.on('message', function (message) { 
            results = message      
        });
        readerShell.end(function (err,code,signal) {
            if (err) reject(err);
            results['debug'].command = currentData.debug.command;
            results['debug'].fileName = currentData.debug.fileName;
            results.debug.time.index=results.debug.time.samplefrequency*visWindow;
            results.debug.time.currentTime=results.debug.time.startTime+visWindow;
            console.log("readerShell",results.debug.time);
            resolve ({r: results, c: code, s: signal});
        });
    });
};  

function myRewinderExecuter(filename,currentData,visWindow) {
    return new Promise(function (resolve, reject) {
        var options = {
            mode: 'json', 
            args: [filename,currentData.debug.time.index,visWindow] 
        };
        let results={};
        let rewinderShell = new PythonShell('/backend/pythonscripts/edfNavigator.py',options);
        rewinderShell.on('message',message=>{ 
            results = message      
        });
        rewinderShell.end(function (err,code,signal) {
            if (err) reject(err);
            //attach old information such as patient info, annotations, debug
            results['debug'] = currentData.debug;
            results.debug.time.currentTime+=currentData.debug.time.startTime+(currentData.debug.time.index/currentData.debug.time.samplefrequency);
            results['annotations']=currentData.annotations;
            results['patientInfo']=currentData.patientInfo;
            console.log('-EC-jumpEDFScript- end of exec edfNavigator',results['debug']);
            resolve ({r: results, c: code, s: signal});
        }); 
    });
}; 


/**  
 * Read EDF file - load_edf
 * @param {string} startDirPath - edf start directory path location
 * @param {Object} currentData - edf object structure *optional  
 * @param {number} index - Where to start in the file
 * @param {number} visWindow - timeframe to retrieve in seconds
 */ 
async function openEDFScript(startDirPath,currentData, index, visWindow) { 
    if (!fs.existsSync(__dirname + startDirPath)) {
        console.log("-EC-eff- no dir ", startDirPath);
        recject("-EC-eff- no dir ");
    } else {
        console.log("-EC-edfFromFile- exist ", startDirPath);
        var builtFilename = path.join(__dirname+startDirPath, currentData.debug.fileName);
        console.log('-EC-edfFromFile- file found: ', builtFilename);
        if (currentData.debug.command == "load_edf"){
            // return openEDFScript(builtFilename,msg,0,10);
            let execution= await myReadExecuter(builtFilename,currentData, index, visWindow);
            return ({
                c: execution.c,
                s: execution.s,
                r: execution.r
            });
        }
        else if (currentData.debug.command == "jump_edf"){
            let execution= await myRewinderExecuter(builtFilename,currentData, visWindow);
            return ({
                c: execution.c,
                s: execution.s,
                r: execution.r
            });
        }
    }
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
            // console.log(message);
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
 * @returns {Promise} PythonShell execution of loreta filter
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
 * @param {Object} currentData - EDF object of the time frame to process   
 * @returns {Object} Execution output code, signal and results
 */ 
async function loretaScript(currentData) { 
    let execution= await myLoretaExecuter(currentData);
    return ({
        c: execution.c,
        s: execution.s,
        r: execution.r
    });
}; 

io.on('connection', function(socket) {
    let edfPath='/backend/server_data';
    actSockets++;
    console.log('a user connected');

    socket.on('load_patients', function(msg) {
        console.log('EC-load_patients call',msg.debug);
        //since it is an async call, io.emit should go into the python-shell callback
        let message ={
            'files':[]
        }
        
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

    //async version
    socket.on('load_edf', function(msg) {
        console.log(msg.debug);
        
        openEDFScript(edfPath,msg,0,10)
        .then(results=>{
            console.log('-EC-edfReader-The exit code was: ' + results.c);
            console.log('-EC-edfReader-The exit signal was: ' + results.s);
            let dbgmsg = "El archivo EDF: "+msg.debug.fileName+", ha sido abierto satisfactoriamente";
            io.emit("load_edf", {response: results.r,dbgmsg:dbgmsg});
            console.log('-EC-edfReader-finished',results.r.debug);  
        })
        .catch(err=>{
            console.log("read err ",err);
            io.emit("load_edf", {response: null,dbgmsg:"Ha ocurrido un error abriendo el archivo: "+msg.debug.fileName});
        });
    });

    socket.on('jump_edf', function(msg) {
        console.log(msg.debug);
        openEDFScript(edfPath,msg,0,10)
        .then(results=>{
            console.log('-EC-edfJumper-The exit code was: ' + results.c);
            console.log('-EC-edfJumper-The exit signal was: ' + results.s);
            io.emit("jump_edf", results.r);
            console.log('-EC-edfJumper-finished',results.r.debug);  
        })
        .catch(err=>{console.log("jump err ",err)});

    });

    socket.on('notch_filter', function(msg) {
        console.log("-EC-notch_filter-Start");
        notchScript(msg)
        .then(results=>{
            console.log('-EC-notch_filter-The exit code was: ' + results.c);
            console.log('-EC-notch_filter-The exit signal was: ' + results.s);
            io.emit("notch_filter",{response: results.r,dbgmsg:"Filtro notch ejecutado satisfactoriamente!" });  
            console.log('-EC-notch_filter-finished');
        })
        .catch(err=>{
            console.log("topoplot err ",err);
            io.emit("notch_filter", {response: null,dbgmsg:"Ha ocurrido un error ejecuntando el filtro notch!" });   
        });
    }); 

    socket.on('ocular_filter', function(msg) {
        console.log("-EC-ocular_filter-Start");
        ocularScript(msg)
        .then((results)=>{
            console.log('-EC-ocular_filter-The exit code was: ' + results.c);
            console.log('-EC-ocular_filter-The exit signal was: ' + results.s);
            io.emit("ocular_filter", {response: results.r,dbgmsg:"Filtro ocular ejecutado satisfactoriamente!" });   
            console.log('-EC-ocular_filter-finished'); 
        })
        .catch(err=>{
            console.log("topoplot err ",err);
            io.emit("ocular_filter", {response: null,dbgmsg:"Ha ocurrido un error ejecuntando el filtro ocular!" });   
        });
    });

    socket.on('topo_plot', function(msg) {
        console.log("-EC-topo_plot-Start");
        topoPlotScript(msg)
        .then((results)=>{
            console.log('-EC-topoplot-The exit code was: ',results.c);
            console.log('-EC-topoplot-The exit signal was: ',  results.s);
            io.emit('topo_plot', { image: true, buffer: results.b.toString('base64') ,dbgmsg: "Topoplot ejecutado satisfactoriamente!"});
            console.log('-EC-topoplot-finished');
        })
        .catch(err=>{
            console.log("topoplot err ",err);
            io.emit('topo_plot', { image: false, buffer: null ,dbgmsg: "Ha ocurrido un error ejecuntando topoplot!"});
        });
    });

    socket.on('loreta_filter', function(msg) {
        console.log("-EC-loreta_filter-Start");
        loretaScript(msg)
        .then((results)=>{
            console.log('-EC-loretaFilter-The exit code was: ',results.c);
            console.log('-EC-loretaFilter-The exit signal was: ',results.s);
            io.emit("loreta_filter", {response:results.r, dbgmsg:"Loreta ejecutado satisfactoriamente!"}); 
            console.log('-EC-loretaFilter-finished');  
        })
        .catch(err=>{
            console.log("loreta err ",err);
            io.emit("loreta_filter", {response:null, dbgmsg:"Ha ocurrido un error ejecuntando loreta!"}); 
        });
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