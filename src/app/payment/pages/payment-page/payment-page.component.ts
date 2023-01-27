import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { PaymentModalComponent } from '../../components/payment-modal/payment-modal.component';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styles: [
  ]
})
export class PaymentPageComponent implements OnInit {

  public page: number = 1;
  public pageSize: number = 10;

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  public openPaymentModal() {
    this.modal.open(PaymentModalComponent, { centered: true });
  }
}
