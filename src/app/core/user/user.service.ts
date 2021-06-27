import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, Payload } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;
  private email: string;
  private id: string;
  private user: User;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient) {
    tokenService.hasToken() &&
      this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const payload = jwt_decode(token) as Payload;
    // console.log(user);

    this.httpClient
      .get(environment.API_URL + `/users/${payload.sub}`)
      .subscribe((res: User) => {
        // console.log(res)
        this.email = res.email;
        this.id = res.id;
        this.user = res;
        this.userSubject.next(res);
      })
    // this.userName = user.name;
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }
}
