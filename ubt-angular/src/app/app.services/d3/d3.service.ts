import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// Operators
import { Headers, RequestOptions } from '@angular/http';

let markers: any;
const handleJSONFile = function (err, data) {
   markers = JSON.parse(data);
};

@Injectable()
export class D3Service {
    constructor(private http: Http) {}
    getPatientData(id_patient: string, initial_time: number) {
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        const route = id_patient;
        return this.http.get('/assets/data/sujeto_base.json');
    }
}
