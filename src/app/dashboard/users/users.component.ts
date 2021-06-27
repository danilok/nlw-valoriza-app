import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';

interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: string;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.httpClient
      .get<User[]>(environment.API_URL + '/users')
      .subscribe(res => this.users = res);

    this.currentUser = this.userService.getId()
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
