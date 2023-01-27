import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {


  canActivate(): boolean{

    const session = sessionStorage.getItem('user');

    if ( session ) {
      return true;
    }

    return false;
    
  }
  
}
