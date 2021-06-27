import { Component } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ap-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css']
})
export class DashboardComponent {
  tags = false;
  users = true;
  compliments = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.verifyActive(event.url);
      }
    });

    const rota = this.router.routerState.snapshot.url;
    this.verifyActive(rota);
  }

  verifyActive(route: string) {
    switch (route) {
      case '/dashboard/users':
        this.users = true;
        this.tags = !this.users;
        this.compliments = !this.users;
        break;
      case '/dashboard/tags':
        this.tags = true;
        this.users = !this.tags;
        this.compliments = !this.tags;
        break;
      case '/dashboard/compliments':
        this.compliments = true;
        this.users = !this.compliments;
        this.tags = !this.compliments;
        break;
    }
  }
}
