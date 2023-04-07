import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getEmployees, getUserSession } from '../../requests';
import { IEmployee } from '../../interfaces';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-manager-employees-page',
  templateUrl: './manager-employees.page.html',
})
export class ManagerEmployeesPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
  employees: IEmployee[];

  async ngOnInit() {
    this.isLoading = true;
    if (!this.userSession.hasSession) return await this.redirectToLogin();
    try {
      await this.fetchEmployees();
      this.isLoading = false;
    } catch {
      await this.redirectToLogin();
    }
  }
  async fetchEmployees() {
    this.employees = await getEmployees(this.userSession.sessionId);
  }

  private async redirectToLogin() {
    resetUserSession();
    await this.router.navigateByUrl('/login');
  }
}
