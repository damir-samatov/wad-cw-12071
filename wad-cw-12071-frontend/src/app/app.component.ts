import { Component } from '@angular/core';
import { getUserSession, logoutUser } from '../requests';
import { ActivatedRoute, Router } from '@angular/router';
import { resetUserSession } from '../utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((val) => {
      this.userSession = getUserSession();
    });
  }
  userSession = getUserSession();

  async logOut() {
    try {
      await logoutUser();
    } catch {}
    resetUserSession();
    await this.router.navigateByUrl('/login');
  }
}
