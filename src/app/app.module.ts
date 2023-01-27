import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ExceptionClient } from './error/exceptionClient';
import { PaymentModule } from './payment/payment.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PaymentModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: ExceptionClient }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
