import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient
      .get<Tag[]>(environment.API_URL + '/tags')
      .subscribe(res => this.tags = res);
  }
}
