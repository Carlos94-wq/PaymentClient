import { Router } from '@angular/router';
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

  constructor(private modal: NgbModal, private Router: Router) { }

  ngOnInit(): void {
  }

  public openPaymentModal() {
    this.modal.open(PaymentModalComponent, { centered: true });
  }

  public logOut(){
    sessionStorage.clear();
    this.Router.navigate(['/'])
  }
}
