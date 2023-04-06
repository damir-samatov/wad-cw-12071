import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUserSession } from '../../requests';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-root',
  templateUrl: '../app.component.html',
})
export class RootPage {
  constructor(private route: ActivatedRoute, private router: Router) {}

  private userSession = getUserSession();

  async ngOnInit() {
    if (!this.userSession.hasSession) await this.router.navigateByUrl('/login');
    try {
      await this.router.navigateByUrl(`/${this.userSession.role}`);
    } catch {
      resetUserSession();
      await this.router.navigateByUrl('/login');
    }
  }
}
