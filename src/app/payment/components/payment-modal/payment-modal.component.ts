import { PaymentService } from './../../services/payment.service';
import { AuthService } from './../../../auth/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from './../../services/catalog.service';
import { Component, OnInit } from '@angular/core';
import PaymentInsert from '../../interfaces/paymentInsert';
import Swal from 'sweetalert2';
import { getLoggedUser } from 'src/app/utils/getLogedUser';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styles: [
  ]
})
export class PaymentModalComponent implements OnInit {

  public suppliers!: any[]
  public currency!: any[]
  public paymentForm!: FormGroup;
  public loading: boolean;

  constructor(
    private CatalogService: CatalogService,
    private fb: FormBuilder,
    /* private auth: AuthService, */
    private PaymentService: PaymentService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.getCatalogs();
    this.buildForm();
  }

  public getCatalogs() {
    this.CatalogService.getSuppliers().subscribe(subs => this.suppliers = subs.data);
    this.CatalogService.getCurrency().subscribe(subs => this.currency = subs.data);
  }

  public buildForm() {
    this.paymentForm = this.fb.group({
      userId: [getLoggedUser().usuario.userId, [Validators.required]],
      amount: ['', [Validators.required]],
      currencyId: ['', [Validators.required]],
      supplierId: ['', [Validators.required]],
      comments: ''
    })
  }

  public onSubmit() {
    
    if (this.paymentForm.invalid) {
      return;
    }

    this.loading = !this.loading
    
    const model: PaymentInsert = { ...this.paymentForm.value };
    console.log(model);

    this.PaymentService.postPayments(model).subscribe({
      next: (subsResponse) => {
        Swal.fire({
          icon:'success',
          text: `Payment saved: ${subsResponse.data}`
        })
        this.loading = !this.loading;
        this.paymentForm.reset()
      },
      error: (err) => {
        this.loading = !this.loading
        throw err;
      }
    })
  }

}
