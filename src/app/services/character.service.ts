import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CharacterListItemModel} from "../models/characterListItem.model";
import {SelectedCharactersModel} from "../models/selectedCharacters.model";

const getCharactersUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/characters/';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private token = localStorage.getItem('token');
  selectedCharacters: Array<CharacterListItemModel> = new Array<CharacterListItemModel>();

  constructor(private http: HttpClient) { }

  fetchAllCharacters(): Observable<any> {
    let headers = new HttpHeaders({
      'Applicant-id': '72fPqjKaG3ea2SR9',
      'Application-Authorization': 'Bearer ' + this.token
    });
    let options = { headers: headers };
    return this.http.get(getCharactersUrl, options);
  }

  getSelectedCharacters(selected: Array<CharacterListItemModel>) {
    for (let i = 0; i < selected.length; i++) {
      this.selectedCharacters.push(selected[i]);
    }
  }

  passSelectedCharacters() {
    return this.selectedCharacters;
  }

}
