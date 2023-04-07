import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployeeCreate } from '../../interfaces';
import { registerEmployee } from '../../requests';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
})
export class RegisterPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  isLoading: boolean = false;
  errorMessages: string[] = [];

  employee: IEmployeeCreate = {
    login: '',
    password: '',
    jobTitle: '',
    firstName: '',
    lastName: '',
    bio: '',
  };

  validate() {
    const errorMessages: string[] = [];

    const { login, password, firstName, lastName, jobTitle, bio } =
      this.employee;

    if (login.length < 4)
      errorMessages.push('Login must be at least 4 characters long');

    if (password.length < 8)
      errorMessages.push('Password must be at least 8 characters long');

    if (jobTitle.length < 2)
      errorMessages.push('Job title must be at least 2 characters long');

    if (firstName === '' || lastName === '' || bio === '')
      errorMessages.push('All fields are required');

    this.errorMessages = errorMessages;

    if (errorMessages.length > 0) {
      this.isLoading = false;
      return false;
    } else {
      return true;
    }
  }

  async onSubmit() {
    this.isLoading = true;
    this.errorMessages = [];
    await this.registerEmployee();
  }

  async registerEmployee() {
    if (this.validate()) {
      try {
        const isSuccess = await registerEmployee(this.employee);
        if (isSuccess) await this.router.navigateByUrl('/login');
        else this.errorMessages.push('Login is already taken');
      } catch {
        this.errorMessages.push('Login is already taken');
      }
    }
    this.isLoading = false;
  }
}
