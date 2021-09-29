import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CharacterListItemModel} from "../models/characterListItem.model";

const getCharactersUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/characters/';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  fetchAllCharacters(): Observable<Array<CharacterListItemModel>> {
    let headers = new HttpHeaders({
      'Applicant-id': '72fPqjKaG3ea2SR9',
      'Application-Authorization': 'Bearer ' + this.token
    });
    let options = { headers: headers };
    return this.http.get<Array<CharacterListItemModel>>(getCharactersUrl, options);
  }

}
