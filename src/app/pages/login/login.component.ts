import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public login: Login = new Login;
    constructor( private snack: MatSnackBar, private loginService: LoginService ) { }

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
                console.log( data );
                this.loginService.loginUser( data.token );
                this.loginService.getCurrentUser().subscribe({
                    next: ( user: any ) => {
                        console.log( user );
                    }
                });
            },
            error: ( error ) => {
                console.log( error );
            }
        });
    }
}