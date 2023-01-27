import { AuthService } from './../../auth/services/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserSession from 'src/app/auth/interfaces/userSession';
import ApiResponse from 'src/app/utils/apiResponse';
import { environment } from 'src/environments/environment';
import paymentQueryFilters from '../interfaces/paymentQueryFilters';
import paymentViewModel from '../interfaces/paymentViewModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string;
  private session: string;
  public headers: HttpHeaders;

  constructor(private http: HttpClient, private AuthService: AuthService) {

    this.baseUrl = environment.baseUrl;
    this.session = this.AuthService.getLoggedUser().token;

    this.headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.session))}`
   });
  }

  public getPayments(filters: paymentQueryFilters): Observable<ApiResponse<paymentViewModel[]>> {

    const params = new HttpParams()
      .set('supplierId', filters.supplierId || '')
      .set('email', filters.email || '')
      .set('pageNumber', filters.pageNumber)
      .set('pageSize', filters.pageSize);


    return this.http.get<ApiResponse<paymentViewModel[]>>(`${this.baseUrl}/payment`, { headers: this.headers, params });
  }

}
