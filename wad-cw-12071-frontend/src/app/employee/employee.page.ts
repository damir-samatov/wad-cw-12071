import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resetUserSession } from '../../utils';
import {
  getEmployee,
  getUserSession,
  updateEmployee,
  updatePassword,
} from '../../requests';
import { IEmployee, IEmployeeUpdate } from '../../interfaces';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
})
export class EmployeePage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  employee: IEmployee;
  newEmployee: IEmployeeUpdate;
  newPassword = '';
  isLoading = true;
  isLoadingPersonalData = false;
  isLoadingPassword = false;
  isEditing = false;
  userSession = getUserSession();
  errorPasswordMessages: string[] = [];
  errorPersonalDataMessages: string[] = [];

  async ngOnInit() {
    await this.getSelf();
  }

  async getSelf() {
    this.isLoading = true;

    if (!this.userSession.hasSession) await this.redirectToLogin();

    try {
      this.employee = await getEmployee(this.userSession.sessionId);
      this.newEmployee = structuredClone(this.employee);
    } catch {
      await this.redirectToLogin();
    }

    this.isLoading = false;
  }

  async onSubmitPassword() {
    this.isLoadingPassword = true;
    if (this.validatePassword()) {
      try {
        await updatePassword(this.newPassword, this.userSession.sessionId);
        this.errorPasswordMessages = [];
        this.isEditing = false;
      } catch {
        this.errorPasswordMessages.push('Server Error');
      }
    }
    this.isLoadingPassword = false;
  }

  async onSubmitPersonalData() {
    this.isLoadingPersonalData = true;
    if (this.validate()) {
      try {
        this.employee = await updateEmployee(
          this.newEmployee,
          this.userSession.sessionId
        );
        this.newEmployee = structuredClone(this.employee);
        this.errorPersonalDataMessages = [];
        this.isEditing = false;
      } catch {
        this.errorPersonalDataMessages.push('Login is already taken');
      }
    }
    this.isLoadingPersonalData = false;
  }

  openEdit() {
    this.isEditing = true;
    this.newEmployee = structuredClone(this.employee);
  }
  closeEdit() {
    this.isEditing = false;
  }

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  validate() {
    const errorMessages: string[] = [];

    const { login, firstName, lastName, jobTitle, bio } = this.newEmployee;

    if (login.length < 4)
      errorMessages.push('Login must be at least 4 characters long');

    if (jobTitle.length < 2)
      errorMessages.push('Job title must be at least 2 characters long');

    if (firstName === '' || lastName === '' || bio === '')
      errorMessages.push('All fields are required');

    this.errorPersonalDataMessages = errorMessages;

    return errorMessages.length < 1;
  }

  validatePassword() {
    const errorMessages: string[] = [];

    if (this.newPassword.length < 8)
      errorMessages.push('Password must be at least 8 characters long');

    this.errorPasswordMessages = errorMessages;

    return errorMessages.length < 1;
  }
}
