import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ManagerPage } from './manager/manager.page';
import { LoginPage } from './login/login.page';
import { LoaderComponent } from '../components/loader/loader.component';
import { TicketsComponent } from '../components/tickets/tickets.component';
import { TicketDetailsComponent } from '../components/ticket-details/ticket-details.component';
import { ManagerTicketsPage } from './manager-tickets/manager-tickets.page';
import { ManagerTicketDetailsPage } from './manager-ticket-details/manager-ticket-details.page';
import { TicketEditComponent } from '../components/ticket-edit/ticket-edit.component';
import { TicketCreateComponent } from '../components/ticket-create/ticket-create.component';
import { RootPage } from './root/root.page';

@NgModule({
  imports: [FormsModule, AppRoutingModule, BrowserModule],
  declarations: [
    AppComponent,
    LoaderComponent,
    TicketsComponent,
    TicketDetailsComponent,
    TicketEditComponent,
    TicketCreateComponent,

    RootPage,
    LoginPage,
    ManagerPage,
    ManagerTicketsPage,
    ManagerTicketDetailsPage,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
