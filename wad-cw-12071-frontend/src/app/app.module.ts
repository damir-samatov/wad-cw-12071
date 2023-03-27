import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    AppRoutingModule,
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
