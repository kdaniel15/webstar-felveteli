import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SelectedCharactersModel} from "../models/selectedCharacters.model";

const simulationUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/simulate/';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  enableSimulation(fighters: SelectedCharactersModel): Observable<any> {
    let headers = new HttpHeaders({
      'Applicant-id': '72fPqjKaG3ea2SR9',
      'Application-Authorization': 'Bearer ' + this.token
    });
    let options = { headers: headers };
    return this.http.post(simulationUrl, fighters, options);
  }
}
