import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { ManagerPage } from './manager/manager.page';
import { ManagerTicketsPage } from './manager-tickets/manager-tickets.page';
import { ManagerTicketDetailsPage } from './manager-ticket-details/manager-ticket-details.page';
import { RootPage } from './root/root.page';

const routes: Routes = [
  { path: '', component: RootPage },
  { path: 'login', component: LoginPage },
  { path: 'manager', component: ManagerPage },
  { path: 'manager/tickets', component: ManagerTicketsPage },
  { path: 'manager/tickets/:id', component: ManagerTicketDetailsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
