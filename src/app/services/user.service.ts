import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

const loginUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/authentication/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  login(user: UserModel): Observable<any> {
    //console.log(user);
    let headers = new HttpHeaders({
      'Applicant-id': '72fPqjKaG3ea2SR9'});
    let options = { headers: headers };
    return this.http.post(loginUrl, user, options);
  }

}
