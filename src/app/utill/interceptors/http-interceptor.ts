import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LoaderService } from '@app/shared-module/sharedServices/loader.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';


@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {

  }
  // get api end proints from angular environment file
  private apiUrl = environment.API_ENDPOINT;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //start loader
    this.showLoader();
    // Assume your authorization token is aleady saved in localstorage
    // tslint:disable-next-line:prefer-const
    let token = localStorage.getItem('token') === undefined ? '' : localStorage.getItem('token');
    // check token is available or not in localstorage
    if (token) {
      // set token in request header without bearer token
      req = req.clone({ headers: req.headers.set('Authorization', token) });
      // set token in request header with bearer token
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }
    // set Content-Type if headers has no Content Type
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    // Set/Specify certain media types which are acceptable for the response
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    // Set API end points with request url
    req = req.clone({
      url: `${this.apiUrl}${req.url}`,
    });
    return next.handle(req).pipe(
      map(event => {
        this.hideLoader();
        if (event instanceof HttpResponse) {
          return event;
          //  this.logger.logDebug(event);
        }
      }),
      catchError(error => {
        this.hideLoader();
        // Handle Unauthorized Responses
        if (error.status === 401) {
          this.logout();
        }
        console.log('Caught error', error);
        return throwError(error);
      })

    )
  }
  logout() {
    // clear the local storage and navigate to login page
    localStorage.clear();
  }

  private showLoader(): void {
    this.loaderService.display(true);
  }

  private hideLoader(): void {
    setTimeout(() => {
      this.loaderService.display(false);
    }, 1000);
  }
}
