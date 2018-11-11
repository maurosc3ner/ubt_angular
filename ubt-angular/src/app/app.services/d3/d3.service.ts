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

    loadPatients(): any {
        const debug = {};
        debug['command'] = 'load_patients';
        const payload = {
            'debug' : debug
        };
        this.socket.emit('load_patients', payload);
        const response = this.socket.fromEvent('load_patients');
        console.log('EC-loadPatients-response received:',response);
        return response;
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
        // console.log(response);
        return response;
    }

    getJump(current_data: any): any {
        current_data['debug']['command'] = 'jump_edf';
        const payload = current_data;
        this.socket.emit('jump_edf', payload);
        const response = this.socket.fromEvent('jump_edf');
        return response;
    }

    getNotchFilter(current_data: any): any {
        current_data['debug']['command'] = 'notch_filter';
        const payload = current_data;
        this.socket.emit('notch_filter', payload);
        const response = this.socket.fromEvent('notch_filter');
        return response;
    }
    getOcularFilter(current_data: any): any {
        current_data['debug']['command'] = 'ocular_filter';
        const payload = current_data;
        this.socket.emit('ocular_filter', payload);
        const response = this.socket.fromEvent('ocular_filter');
        return response;
    }

    getTopoPlot(current_data: any): any {
        current_data['debug']['command'] = 'topo_plot';
        const payload = current_data;
        this.socket.emit('topo_plot', payload);
        const response = this.socket.fromEvent('topo_plot');
        // console.log('EC-serviceTopoPlot ',response);
        return response;
    }

    getLoretaFilter(current_data: any): any {
        current_data['debug']['command'] = 'loreta_filter';
        const payload = current_data;
        this.socket.emit('loreta_filter', payload);
        const response = this.socket.fromEvent('loreta_filter');
        // console.log('EC-serviceTopoPlot ',response);
        return response;
    }
}
