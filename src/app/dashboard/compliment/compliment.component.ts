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
  tags: Tag[] = [
    {
      id: 'aaa',
      name: 'aaa',
      name_custom: 'bbb'
    }
  ];

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
    }
  }

  ngOnInit() {
    this.complimentForm = this.formBuilder.group({
      tag: ['', Validators.required],
      message: ['', Validators.required]
    })

    this.httpClient
      .get<Tag[]>(environment.API_URL + '/tags')
      .subscribe(res => this.tags = res);
  }

  sendCompliment() {}
}
