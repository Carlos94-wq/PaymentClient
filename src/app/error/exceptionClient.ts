import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExceptionClient {

  constructor(private Router: Router) { }

  handleError(error: HttpErrorResponse) {

    console.log(error);

    switch (error.status) {
      case 500:
        Swal.fire({
          icon: 'error',
          text: error.error.Message
        })
        break;
      case 400:
        Swal.fire({
          icon: 'warning',
          text: error.error.Message
        })
        break;
      case 404:
        Swal.fire({
          icon: 'warning',
          text: error.error.Message
        })

        break;
      case 401:
        Swal.fire({
          icon: 'question',
          text: error.message
        })

        sessionStorage.clear();
        this.Router.navigate(['/'])
        break;

      default:
        break;
    }
  }
}