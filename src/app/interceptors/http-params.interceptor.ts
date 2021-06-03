import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpParamsInterceptor implements HttpInterceptor{
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setParams: {
        key: 'b8b8ad119c0d48178baf701db229c1ca'
      }
    })
    return next.handle(req);
  }

}
