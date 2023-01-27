import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
