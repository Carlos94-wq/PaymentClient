import { Observable } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import ApiResponse from 'src/app/utils/apiResponse';
import { getLoggedUser } from 'src/app/utils/getLogedUser';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {


  private baseUrl: string;
  private session: string;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseUrl;
    this.session = getLoggedUser().token;

    this.headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.session))}`
   });   
  }


  public getSuppliers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/catalog/supplier`, { headers: this.headers });
  }

  public getCurrency(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/catalog/currency`, { headers: this.headers });
  }
}
