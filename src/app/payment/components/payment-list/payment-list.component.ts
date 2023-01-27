import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModule } from '../../payment.module';
import paymentViewModel from '../../interfaces/paymentViewModel';
import paymentQueryFilters from '../../interfaces/paymentQueryFilters';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styles: [
  ]
})
export class PaymentListComponent implements OnInit {

  public viewModel!: paymentViewModel[];

  constructor(private PaymentService: PaymentService) { }

  ngOnInit(): void {

    const filters: paymentQueryFilters = {
      pageNumber:'1',
      pageSize: '10'
    }
    this.PaymentService.getPayments(filters).subscribe( subs => this.viewModel = subs.data );

  }


}
