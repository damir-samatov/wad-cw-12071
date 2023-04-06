import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ManagerPage } from './manager/manager.page';
import { LoginPage } from './login/login.page';
import { LoaderComponent } from '../components/loader/loader.component';
import { TicketsComponent } from '../components/tickets/tickets.component';

@NgModule({
  imports: [FormsModule, AppRoutingModule, BrowserModule],
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginPage,
    ManagerPage,
    TicketsComponent,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
