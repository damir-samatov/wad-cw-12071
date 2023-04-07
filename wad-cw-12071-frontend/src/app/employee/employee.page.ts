import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resetUserSession } from '../../utils';
import { getEmployee, getManager, getUserSession } from '../../requests';
import { IEmployee } from '../../interfaces';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
})
export class EmployeePage {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public isLoading = true;

  public employee: IEmployee;

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  async ngOnInit() {
    const userSession = getUserSession();

    if (!userSession.hasSession) await this.redirectToLogin();

    try {
      this.employee = await getEmployee(userSession.sessionId);
    } catch {
      await this.redirectToLogin();
    }

    this.isLoading = false;
  }
}
