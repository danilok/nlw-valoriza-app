import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   admin: boolean;
// }

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: User;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.httpClient
      .get<User[]>(environment.API_URL + '/users')
      .subscribe(res => this.users = res);

    this.userService
      .getUser()
      .subscribe(user => {
        // console.log(user);

        this.currentUser = user
      });
  }

  onClick(user: User) {
    // console.log(user);
    // console.log(this.currentUser);
    this.router.navigate(['dashboard', 'compliment'], {
      state: {
        user: JSON.stringify(user),
        currentUser: this.currentUser
      }
    })
  }
}
