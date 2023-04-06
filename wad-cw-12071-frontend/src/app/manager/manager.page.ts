import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resetUserSession } from '../../utils';
import { getManager, getUserSession } from '../../requests';
import { IManager } from '../../interfaces';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
})
export class ManagerPage {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public isLoading = true;

  public manager: IManager;

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  async ngOnInit() {
    const userSession = getUserSession();

    if (!userSession.hasSession) await this.redirectToLogin();

    try {
      this.manager = await getManager(userSession.sessionId);
    } catch {
      await this.redirectToLogin();
    }

    this.isLoading = false;
  }
}
