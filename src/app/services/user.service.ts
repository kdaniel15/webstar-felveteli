import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";

const loginUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/authentication/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  login(user: UserModel) {
    return this.http.post(loginUrl, user);
  }

}
