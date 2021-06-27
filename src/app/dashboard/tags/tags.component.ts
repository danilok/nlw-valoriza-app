import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';
import { Tag } from '../Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  currentUser: User;
  show = false;
  alert = false;
  success = false;
  alertMessage = '';

  tagForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userService: UserService) { }

  ngOnInit() {

    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    })

    this.httpClient
      .get<Tag[]>(environment.API_URL + '/tags')
      .subscribe(res => this.tags = res);

      this.userService
      .getUser()
      .subscribe(user => this.currentUser = user);
  }


  createTag() {
    const { name } = this.tagForm.getRawValue();
    this.httpClient
      .post(
        environment.API_URL + '/tags',
        {
          name
        }
      )
      .subscribe((tag: Tag) => {
        this.alertMessage = 'New tag created.';
        this.changeState('success');

        this.tags.push(tag);
      });
  }

  removeTag(tag: Tag, i: number) {
    this.httpClient
      .delete(environment.API_URL + `/tags/${tag.id}`)
      .subscribe(res => {
          this.alertMessage = `Tag ${tag.name} successfully removed.`;
          this.changeState('success');
          this.tags.splice(i, 1);
        },
        err => {
          this.alertMessage = `Error on deleting tag ${tag.name}`;
          this.changeState('alert');
        }
      );
  }

  changeState(field: string) {
    this[field] = !this[field];
    setTimeout(() => {
      this[field] = !this[field];
    }, 2 * 1000);
  }
}
