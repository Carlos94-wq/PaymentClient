import { CatalogService } from './../../services/catalog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import paymentViewModel from '../../interfaces/paymentViewModel';
import paymentQueryFilters from '../../interfaces/paymentQueryFilters';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

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
    private modalService: NgbModal
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

  public takeRow(id: number) {

    this.PaymentService.getPaymentById(id).subscribe({
      next: (subs) => {
        const modalRef = this.modalService.open(PaymentModalComponent, { centered: true, });
        modalRef.componentInstance.paymentId = id;
        modalRef.componentInstance.updateModel = subs.data;

        modalRef.componentInstance.emmitDelete.subscribe((result:boolean) => {
          if (result) {
            this.startList();
          }
        })

      }
    })
  }
}
