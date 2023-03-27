import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { API_URL } from "../../constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private route: ActivatedRoute) { }

  hasError: boolean = false;
  isManager: boolean = false;
  login: string = "";
  password: string = "";

  async onSubmit() {
    const loginDto = {
      login: this.login,
      password: this.password,
      isManager: this.isManager
    }

    const headers = new Headers(
      [
        ["Content-Type", "application/json"]
      ]
    );

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify(loginDto)
    })
      .then(res => res.json())
      .then(console.log)
      .catch(() => this.hasError = true)
  }
}
