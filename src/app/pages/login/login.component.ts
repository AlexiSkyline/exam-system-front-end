import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from 'src/app/models/Login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public login: Login = new Login;
    constructor( private snack: MatSnackBar, private loginService: LoginService, private router: Router ) { }

    ngOnInit(): void {}

    formSubmit() {
        if( this.login.getUsername.trim() === '' || this.login.getUsername.trim === null ) {
            this.snack.open( 'The Username is required', 'Ok', {
                duration: 3000
            });
            return;
        }

        if( this.login.getPassword.trim() === '' || this.login.getPassword.trim === null ) {
            this.snack.open( 'The Password is required', 'Ok', {
                duration: 3000
            });
            return;
        }

        this.loginService.login( this.login ).subscribe({
            next: ( data: any ) => {
                this.loginService.loginUser( data.token );
                this.loginService.getCurrentUser().subscribe({
                    next: ( user: any ) => {
                        this.loginService.setUser( user );
                        this.redirectUser( this.loginService.getUserRole().getName );
                    }
                });
            },
            error: ( error ) => {
                this.snack.open( 'The data are incorrect, please try again', 'Ok', {
                    duration: 3000
                });
            }
        });
    }

    private redirectUser( typeRole: string ): void {
        if( typeRole == 'ROLE_ADMIN' ) {
            this.router.navigate([ '/admin' ]);
            this.loginService.loginStatusSubject.next( true );
        } else if( typeRole == 'ROLE_NORMAL' ) {
            this.router.navigate([ '/user-dashboard' ]);
            this.loginService.loginStatusSubject.next( true );
        } else {
            this.loginService.logOut();
            this.loginService.loginStatusSubject.next( false );
        }
    }
}