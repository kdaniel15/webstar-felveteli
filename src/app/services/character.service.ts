import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CharacterListItemModel} from "../models/characterListItem.model";

const getCharactersUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/characters/';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private token = localStorage.getItem('token');
  lightSideFighter: CharacterListItemModel;
  darkSideFighter: CharacterListItemModel;

  constructor(private http: HttpClient) {
  }

  fetchAllCharacters(): Observable<any> {
    let headers = new HttpHeaders({
      'Applicant-id': '72fPqjKaG3ea2SR9',
      'Application-Authorization': 'Bearer ' + this.token
    });
    let options = {headers: headers};
    return this.http.get(getCharactersUrl, options);
  }

  getSelectedCharacters(selected: Array<CharacterListItemModel>) {
    if (selected[0].side == 'DARK') {
      this.darkSideFighter = selected[0];
      this.lightSideFighter = selected[1];
    } else {
      this.lightSideFighter = selected[0];
      this.darkSideFighter = selected[1];
    }
  }

}
