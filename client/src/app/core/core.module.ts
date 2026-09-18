import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { TestErrorComponent } from './test-error/test-error.component';



@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
],

  exports: [
    NavBarComponent,
  ]
})
export class CoreModule { }
