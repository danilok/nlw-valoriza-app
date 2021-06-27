import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Tag } from '../Tag';

@Component({
  selector: 'app-compliment',
  templateUrl: './compliment.component.html'
})

export class ComplimentComponent implements OnInit {
  data: any = {};
  routeState: any;
  tags: Tag[] = [];

  complimentForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        // console.log(this.routeState);

        this.data.user = this.routeState.user ? JSON.parse(this.routeState.user) : '';
        this.data.currentUser = this.routeState.currentUser ? this.routeState.currentUser : '';
        // console.log(this.data)
      }
    } else {
      this.router.navigate(['dashboard/users'])
    }
  }

  ngOnInit() {
    const name  = this.data?.user?.name ? this.data.user.name : '';
    this.complimentForm = this.formBuilder.group({
      name: [{value: name, disabled: true}],
      tag: ['', Validators.required],
      message: ['', Validators.required]
    })

    this.httpClient
      .get<Tag[]>(environment.API_URL + '/tags')
      .subscribe(res => this.tags = res);
  }

  sendCompliment() {
    const { tag, message } = this.complimentForm.getRawValue();
    this.httpClient
      .post(
        environment.API_URL + '/compliments',
        {
          tag_id: tag,
          user_receiver: this.data.user.id,
          message
         }
      )
      .subscribe(res => {
        this.router.navigate(['dashboard/users']);
      });
  }

  onCancel() {
    this.router.navigate(['dashboard/users']);
  }
}
