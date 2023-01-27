import { AppGuard } from './guards/app.guard';
import { PaymentPageComponent } from './payment/pages/payment-page/payment-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { HomeComponent } from './shared/components/home/home.component';

const APP_ROUTES: Routes = [
  { path: '', component: AuthPageComponent, },
  {
    path: 'home', component: HomeComponent, canActivate: [AppGuard], children: [
      { path: 'payment', component: PaymentPageComponent },
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
