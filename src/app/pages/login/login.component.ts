import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from 'src/app/models/Login';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../models/LoginResponse';
import { getMessageError } from '../../models/ResponseException';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public login: Login = new Login;
    constructor( private snack: MatSnackBar, private loginService: LoginService, private router: Router ) {}

    ngOnInit(): void {}

    formSubmit() {
        if( !this.isValidForm() ) return;
        
        this.loginService.login( this.login ).subscribe({
            next: ( loginResponse: LoginResponse ) => {
                this.loginService.loginUser( loginResponse.data.accessToken );
                this.loginService.setUser( loginResponse.data.userDetails );
                this.redirectUser( this.loginService.getUserRole().getName );
            },
            error: ( error: any ) => {
                const message = getMessageError( error );
                this.snack.open( message, 'Ok', {
                    duration: 3000
                });
            }
        });
    }

    private isValidForm(): boolean {
        if( this.login.username?.trim() === '' || typeof this.login.username === 'undefined' ) {
            this.snack.open( 'The Username is required', 'Ok', {
                duration: 3000
            });
            return false;
        }

        if( this.login.password?.trim() === '' || typeof this.login.password === 'undefined' ) {
            this.snack.open( 'The Password is required', 'Ok', {
                duration: 3000
            });
            return false;
        }

        return true;
    }

    private redirectUser( typeRole: string ): void {
        if( typeRole == 'ROLE_ADMIN' ) {
            this.router.navigate([ '/admin' ]);
            this.loginService.loginStatusSubject.next( true );
        } else if( typeRole == 'ROLE_USER' ) {
            this.router.navigate([ '/user-dashboard/0' ]);
            this.loginService.loginStatusSubject.next( true );
        } else {
            this.loginService.logOut();
            this.loginService.loginStatusSubject.next( false );
        }
    }
}