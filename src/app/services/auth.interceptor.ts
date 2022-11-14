import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor( private LoginService: LoginService ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = this.LoginService.getToken();

        if( token != null ) {
            authRequest = authRequest.clone({
                setHeaders: { Authorization: `Bearer ${ token }` }
            })
        }

        return next.handle( authRequest );
    }
}

export const AuthInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]