import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { ManagerPage } from './manager/manager.page';
import { ManagerTicketsPage } from './manager-tickets/manager-tickets.page';
import { ManagerTicketDetailsPage } from './manager-ticket-details/manager-ticket-details.page';
import { RootPage } from './root/root.page';
import { RegisterPage } from './register/register.page';
import { EmployeePage } from './employee/employee.page';
import { EmployeeTicketsPage } from './employee-tickets/employee-tickets.page';
import { EmployeeTicketDetailsPage } from './employee-ticket-details/employee-ticket-details.page';

const routes: Routes = [
  { path: '', component: RootPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },

  { path: 'employee', component: EmployeePage },
  { path: 'employee/tickets', component: EmployeeTicketsPage },
  { path: 'employee/tickets/:id', component: EmployeeTicketDetailsPage },

  { path: 'manager', component: ManagerPage },
  { path: 'manager/tickets', component: ManagerTicketsPage },
  { path: 'manager/tickets/:id', component: ManagerTicketDetailsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
