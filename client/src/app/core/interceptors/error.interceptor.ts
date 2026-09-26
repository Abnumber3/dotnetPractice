import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse} from '@angular/common/http';
  import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService
  
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          if(error.status === 400){
            this.toastr.error(error.error.message, error.status.toString());
          }

          if(error.status === 401){
            this.toastr.error(error.error.message, error.status.toString());
          }
        if(error.status === 404){
          this.router.navigateByUrl('/not-found');
        }
        if(error.status === 500){
          this.router.navigateByUrl('/server-error');
        }      
      }
      return throwError(()=>{
        console.log(error);
       return new Error(error.message);
      })
      })
    )
  }
}
