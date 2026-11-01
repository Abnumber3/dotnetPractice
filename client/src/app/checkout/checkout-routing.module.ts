import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';

const Routes = [
  {path: '', component: CheckoutComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(Routes),
  ],

  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
