import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PaymentService } from './../../services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from './../../services/catalog.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getLoggedUser } from 'src/app/utils/getLogedUser';
import PaymentModel from '../../interfaces/paymentModel';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html'
})
export class PaymentModalComponent implements OnInit {

  @Input() public paymentId!: number;
  @Input() public updateModel!: PaymentModel;
  @Input() public startList!: any;
  @Output() public emmitDelete: EventEmitter<boolean>;
  public suppliers!: any[]
  public currency!: any[]
  public paymentForm!: FormGroup;
  public loading: boolean;
  public wantsUpdate!: boolean;

  constructor(
    private CatalogService: CatalogService,
    private fb: FormBuilder,
    private PaymentService: PaymentService,
    private modalService: NgbModal
  ) {

    this.loading = false;
    this.emmitDelete = new EventEmitter();

  }

  ngOnInit(): void {

    this.getCatalogs();
    this.buildForm();
    this.wantsUpdate = this.paymentId !== undefined;

    if ( this.updateModel ) {
      console.log(this.updateModel)
      this.paymentForm.controls['supplierId'].patchValue(this.updateModel.supplierId);
      this.paymentForm.controls['amount'].patchValue(this.updateModel.amount);
      this.paymentForm.controls['currencyId'].patchValue(this.updateModel.currencyId);
      this.paymentForm.controls['comments'].patchValue(this.updateModel.comments);
    }

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

  public insertPayment(model: PaymentModel) {
    this.PaymentService.postPayments(model).subscribe({
      next: (subsResponse) => {
        Swal.fire({
          icon: 'success',
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

  public updatePayment(model: PaymentModel) {

    this.PaymentService.putPayments(this.paymentId, model).subscribe({
      next: (subsResponse) => {
        Swal.fire({
          icon: 'success',
          text: `Payment saved: ${subsResponse.data}`
        })
        this.loading = !this.loading;
        this.paymentForm.reset()
      },
      error: (err) => {
        this.loading = !this.loading
        throw err;
      }
    });

  }

  public onSubmit() {

    if (this.paymentForm.invalid) {
      return;
    }

    this.loading = !this.loading

    const model: PaymentModel = { ...this.paymentForm.value };


    if (this.wantsUpdate) {

      this.updatePayment(model);

    } else {

      this.insertPayment(model);

    }

  }

  public async deletePayment(){

    const question = await Swal.fire({ icon:'question', showConfirmButton: true, showCancelButton: true, title: "Are you sure you want to remove this payment?" });

    if (question.isConfirmed) {
      this.PaymentService.deletePayments(this.paymentId).subscribe({
        next: (deleted) =>{
          console.log(deleted);
          this.emmitDelete.emit(true);
          this.modalService.dismissAll();
        }
      })
    }
  }

}
