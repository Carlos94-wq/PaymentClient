import { CatalogService } from './../../services/catalog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import paymentViewModel from '../../interfaces/paymentViewModel';
import paymentQueryFilters from '../../interfaces/paymentQueryFilters';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styles: [
  ]
})
export class PaymentListComponent implements OnInit {

  public viewModel!: paymentViewModel[];
  public filtersForm!: FormGroup;
  public filtersModel!: paymentQueryFilters;
  public page!: number;
  public pageSize!: number;
  public collectionSize!: number;
  public currency!: any[];
  public supplier!: any[];

  constructor(
    private fb: FormBuilder,
    private CatalogService: CatalogService,
    private PaymentService: PaymentService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

    this.startList();
    this.getCatalogs();
  }

  public getCatalogs() {
    this.CatalogService.getSuppliers().subscribe(subs => this.supplier = subs.data);
  }

  public startList() {
    this.PaymentService.getPayments().subscribe({
      next: (subs) => {

        console.log(subs);

        this.viewModel = subs.data;
        this.pageSize = subs.metadata.pageSize;
        this.page = subs.metadata.currentPage;
        this.collectionSize = subs.metadata.totalCount;

      }
    });
  }

  public clearFilters() {
    this.filtersForm.reset();
    this.startList();
  }

  public buildForm() {
    this.filtersForm = this.fb.group({
      supplierId: [''],
      email: [''],
      paymentId: [''],
      pageNumber: [''],
      pageSize: ['']
    })
  }

  public onEmitFilters() {

    this.filtersModel = { ...this.filtersForm.value };
    this.PaymentService.getPayments(this.filtersModel).subscribe({
      next: (subs) => {

        this.viewModel = subs.data;
        this.pageSize = subs.metadata.pageSize;
        this.page = subs.metadata.currentPage;
        this.collectionSize = subs.metadata.totalCount;

      },
      error: (err) => {
        this.filtersForm.reset();
        throw err;
      }
    });

  }

  public onPageChange(page: number) {

    this.page = page;
    this.filtersModel = { ...this.filtersForm.value, pageNumber: page.toString(), pageSize: this.pageSize.toString() };

    this.PaymentService.getPayments(this.filtersModel).subscribe(subs => {

      this.viewModel = subs.data;
      this.pageSize = subs.metadata.pageSize;
      this.page = subs.metadata.currentPage;
      this.collectionSize = subs.metadata.totalCount;

    });

  }

  public async deletePayment( id: number ){
    console.log(id);

    const question = await Swal.fire({ icon:'question', showConfirmButton: true, showCancelButton: true, title: "Are you sure you want to remove this payment?" });

    if (question.isConfirmed) {
      this.PaymentService.deletePayments(id).subscribe({
        next: (deleted) =>{
          console.log(deleted);
          this.startList();
        }
      })
    }
  }

}
