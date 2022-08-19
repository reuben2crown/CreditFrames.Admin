import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthTokenModel, AuthUserData, CommonService, EventHelper } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: AuthTokenModel;
  date: Date = new Date();
  isCollapsed = false;
  isAuthenticated: boolean;
  pageTitle: string;
  eventSub: Subscription;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, public authData: AuthUserData, public commonService: CommonService, private titleService: Title, private eventHelper: EventHelper) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authData.isAuthenticated();
    this.user = this.authData.getUserData();
    this.setPageTitle();
      
    this.eventSub = this.eventHelper.loginEvent.subscribe((value: boolean) => {
      setTimeout(() => {
        this.isAuthenticated = this.authData.isAuthenticated();
      }, 0);
    });
  }

  setPageTitle() {
    // window.scrollTo(0, 0);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join('-');
        this.pageTitle = title;
        this.titleService.setTitle(`${title} - CreditFrames Admin`);
      }
      // window.scrollTo(0, 0);
    });
  }

  getTitle(state, parent): any {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  logout() {
    this.authData.logout();
    this.isAuthenticated = this.authData.isAuthenticated();
    window.location.href = '/login';
  }
    
  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
