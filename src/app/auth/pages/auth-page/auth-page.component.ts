import UserCredentials from '../../interfaces/userCredentials';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styles: [
  ]
})
export class AuthPageComponent implements OnInit {

  public loginForm!: FormGroup;
  public loader: boolean;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private Router: Router
  ) {
    this.loader = false;
  }

  ngOnInit(): void {
    this.buildForm()
  }

  public buildForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      passWord: ['', Validators.required]
    })
  }

  public onSubmit() {

    this.loader = !this.loader

    if (this.loginForm.invalid) {
      return;
    }

    const login: UserCredentials = {
      ...this.loginForm.value
    }

    this.AuthService.login(login).subscribe({
      next: ( subsResponse ) => {
        console.log(subsResponse);
        this.Router.navigate(['/home/payment'])
      },
      error: (err) =>{ 
        this.loader = !this.loader
        throw err; 
      }
    })

  }

}
