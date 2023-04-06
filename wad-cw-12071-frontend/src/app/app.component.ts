import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUserSession, resetUserSession } from '../utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const userSession = getUserSession();

    if (!userSession.hasSession) await this.router.navigateByUrl('/login');

    try {
      if (this.router.url === '/')
        await this.router.navigateByUrl(`/${userSession.role}`);
    } catch {
      resetUserSession();
    }
  }
}
