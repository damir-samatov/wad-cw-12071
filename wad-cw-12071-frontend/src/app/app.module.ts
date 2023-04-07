import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ManagerPage } from './manager/manager.page';
import { LoginPage } from './login/login.page';
import { LoaderComponent } from '../components/loader/loader.component';
import { TicketsComponent } from '../components/tickets/tickets.component';
import { ManagerTicketDetailsComponent } from '../components/manager-ticket-details/manager-ticket-details.component';
import { ManagerTicketsPage } from './manager-tickets/manager-tickets.page';
import { ManagerTicketDetailsPage } from './manager-ticket-details/manager-ticket-details.page';
import { TicketEditComponent } from '../components/ticket-edit/ticket-edit.component';
import { TicketCreateComponent } from '../components/ticket-create/ticket-create.component';
import { RootPage } from './root/root.page';
import { RegisterPage } from './register/register.page';
import { EmployeePage } from './employee/employee.page';
import { EmployeeTicketsPage } from './employee-tickets/employee-tickets.page';
import { EmployeeTicketDetailsComponent } from '../components/employee-ticket-details/employee-ticket-details.component';
import { EmployeeTicketDetailsPage } from './employee-ticket-details/employee-ticket-details.page';

@NgModule({
  imports: [FormsModule, AppRoutingModule, BrowserModule],
  declarations: [
    AppComponent,
    LoaderComponent,
    TicketsComponent,
    ManagerTicketDetailsComponent,
    EmployeeTicketDetailsComponent,
    TicketEditComponent,
    TicketCreateComponent,

    RootPage,
    LoginPage,
    RegisterPage,

    EmployeePage,
    EmployeeTicketsPage,
    EmployeeTicketDetailsPage,

    ManagerPage,
    ManagerTicketsPage,
    ManagerTicketDetailsPage,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
