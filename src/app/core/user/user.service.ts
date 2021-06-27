import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

import jwt_decode from 'jwt-decode';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;
  private email: string;
  private id: string;

  constructor(private tokenService: TokenService) {
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
    const user = jwt_decode(token) as User;
    // console.log(user);

    // this.userName = user.name;
    this.email = user.email;
    this.id = user.sub;
    this.userSubject.next(user);
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
