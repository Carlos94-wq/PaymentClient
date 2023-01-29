import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaymentPageComponent,
    PaymentModalComponent,
    PaymentListComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
