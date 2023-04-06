import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { ManagerPage } from './manager/manager.page';
import { TicketsComponent } from '../components/tickets/tickets.component';

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'manager', component: ManagerPage },
  { path: 'manager/tickets', component: TicketsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
