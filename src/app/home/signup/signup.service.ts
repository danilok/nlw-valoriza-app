import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewUser } from './new-user';

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) { }

  userNameTaken(userName: string) {

    // return this.http.get(environment.API_URL + '/user/exists/' + userName);
    return of(true);
  }

  signup(newUser: NewUser) {
    return this.http.post(environment.API_URL + '/users', newUser);
  }
}
