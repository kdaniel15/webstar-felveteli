import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const simulationUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/simulate/';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private http: HttpClient) { }

  enableSimulation(): Observable<any> {
    let headers = new HttpHeaders({
      'Applicant-id': '72fPqjKaG3ea2SR9'});
    let options = { headers: headers };
    return this.http.post(simulationUrl, options);
  }
}
