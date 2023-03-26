import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isManager: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isManager = this.route.snapshot.data['isManager'] || false;
  }
}
