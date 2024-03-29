import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loginUser } from '../../requests';
import { ILogin } from '../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  isLoading: boolean = false;
  hasError: boolean = false;
  loginDto: ILogin = {
    login: '',
    password: '',
    isManager: false,
  };

  async onSubmit() {
    this.isLoading = true;

    try {
      const isLoginSuccess = await loginUser(this.loginDto);
      if (isLoginSuccess) {
        await this.router.navigateByUrl(
          this.loginDto.isManager ? '/manager' : '/employee'
        );
      } else {
        this.hasError = true;
      }
    } catch {
      this.hasError = true;
    }

    this.isLoading = false;
  }
}
