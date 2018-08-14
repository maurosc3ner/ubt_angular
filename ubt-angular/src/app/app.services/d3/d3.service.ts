import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

// Operators
import { Headers } from '@angular/http';
import { SocketIo } from 'ng-io';

let markers: any;
const handleJSONFile = function (err, data) {
   markers = JSON.parse(data);
};

@Injectable()
export class D3Service {
    current_data: any;
    constructor(private http: HttpClient, private httptest: Http, private socket: SocketIo) {
    }
    getPatientData(id_patient: string, initial_time: number) {
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        const route = id_patient;
        return this.httptest.get('./assets/data/sujeto_base_19_29.json');
    }

    getServerData(id_patient: string, initial_time: number) {
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        const route = id_patient;
        return this.http.get('http://localhost:3000/tests');
    }

    getPatientInfo(msg: string, current_data: any): any {
        const debug = {};
        debug['command'] = 'load_edf';
        debug['fileName'] = msg;
        debug['index'] = 0;
        debug['visWindow'] = 10;
        const payload = {
            'debug' : debug
        };
        this.socket.emit('load_edf', payload);
        const response = this.socket.fromEvent('load_edf');
        console.log(response);
        return response;
    }

    getJump(current_data: any): any {
        let debug = current_data['debug'];
        debug['command'] = 'jump_edf';
        const payload = {
            'debug' : debug
        };
        this.socket.emit('jump_edf', payload);
        const response = this.socket.fromEvent('jump_edf');
        console.log(response);
        return response;
    }


}
