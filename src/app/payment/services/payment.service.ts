import paymentQueryFilters from '../interfaces/paymentQueryFilters';
import paymentViewModel from '../interfaces/paymentViewModel';
import PaymentModel from '../interfaces/paymentModel';
import ApiResponse from 'src/app/utils/apiResponse';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getLoggedUser } from 'src/app/utils/getLogedUser';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string;
  private session: string;
  public headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) 
  {

    this.baseUrl = environment.baseUrl;
    this.session = getLoggedUser().token;

    this.headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.session))}`
   });

  }

  public getPayments(filters?: paymentQueryFilters): Observable<ApiResponse<paymentViewModel[]>> {

    const params = new HttpParams()
      .set('supplierId', filters?.supplierId || '')
      .set('paymentId', filters?.paymentId || '')
      .set('email', filters?.email || '')
      .set('pageNumber', filters?.pageNumber || 0)
      .set('pageSize', filters?.pageSize || 0);


    return this.http.get<ApiResponse<paymentViewModel[]>>(`${this.baseUrl}/payment`, { headers: this.headers, params });
  }

  public postPayments(Modelinsert: PaymentModel): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.baseUrl}/payment`, Modelinsert, { headers: this.headers });
  }

  public putPayments(paymentId: number, model: PaymentModel): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(`${this.baseUrl}/payment/${paymentId}`, model, { headers: this.headers });
  }

  public deletePayments(paymentId: number): Observable<ApiResponse<number>> {
    return this.http.delete<ApiResponse<number>>(`${this.baseUrl}/payment/${paymentId}`, { headers: this.headers });
  }

  public getPaymentById(paymentId: number): Observable<ApiResponse<PaymentModel>> {
    return this.http.get<ApiResponse<PaymentModel>>(`${this.baseUrl}/payment/${paymentId}`, { headers: this.headers });
  }


}
