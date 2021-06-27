import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Compliments {
  id: string;
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

@Component({
  selector: 'app-compliments',
  templateUrl: './compliments.component.html'
})
export class ComplimentsComponent implements OnInit {
  sentCompliments: Compliments[] = [];
  receivedCompliments: Compliments[] = [];
  tab = true;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient
      .get<Compliments[]>(environment.API_URL + '/users/compliments/receive')
      .subscribe(res => this.receivedCompliments = res);

    this.httpClient
      .get<Compliments[]>(environment.API_URL + '/users/compliments/send')
      .subscribe(res => this.sentCompliments = res);
  }
}
