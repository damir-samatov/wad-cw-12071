import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUserSession, resetUserSession } from '../../utils';
import { API_URL } from '../../constants';
import { IManagerResponse } from '../../interfaces';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
})
export class ManagerPage {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public isLoading = true;

  public managerResponseDto: IManagerResponse = {
    id: 0,
  };

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  async ngOnInit() {
    const userSession = getUserSession();

    if (!userSession.hasSession) await this.redirectToLogin();

    const headers = new Headers([
      ['Content-Type', 'application/json'],
      ['X-Auth-Token', `${userSession.sessionId}`],
    ]);

    try {
      const res = await fetch(`${API_URL}/manager`, {
        method: 'GET',
        headers,
      });
      if (res.status !== 200) await this.redirectToLogin();
      this.managerResponseDto = await res.json();
    } catch {
      await this.redirectToLogin();
    }

    this.isLoading = false;
  }
}
