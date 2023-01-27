import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import ApiResponse from 'src/app/utils/apiResponse';
import { environment } from 'src/environments/environment';
import UserCredentials from '../interfaces/userCredentials';
import UserSession from '../interfaces/userSession';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;
  private loggedUser: UserSession; 

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseUrl;
    this.loggedUser = JSON.parse(`${sessionStorage.getItem("user")}`)
  }

  private storeUser(session: UserSession){
    sessionStorage.setItem('user', JSON.stringify(session));
  }

  public login(credentials: UserCredentials):Observable<ApiResponse<UserSession>>{

    const headers = new HttpHeaders().set('Content-type','application/json')

    return this.http.post< ApiResponse<UserSession>>(`${this.baseUrl}/auth`, credentials, { headers }).pipe(
      tap( (tapResponse) => {
        this.storeUser(tapResponse.data);
      })
    )
  }

  public getLoggedUser(): UserSession{
    return this.loggedUser;
  }

}
