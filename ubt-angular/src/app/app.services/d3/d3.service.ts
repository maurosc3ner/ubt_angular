import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

// Operators
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class D3Service {
    constructor(private http: Http) {}
    getPatient(id_patient: string, initial_time: number) {
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        const route = id_patient;
        const obs: Observable<Response> =  this.http.get(route, { headers });
        return obs;
    }
}
