import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public user: User = new User;
    constructor( private userService: UserService, private snack: MatSnackBar ) { }

    ngOnInit(): void {}

    forSubmit() {
        if( this.user.getUsername === '' || this.user.getUsername === null ) {
            this.snack.open( 'The Username is Required', 'Ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.userService.addUser( this.user ).subscribe({
            next: () => Swal.fire( 'The User has been saved', 'The User has saved correctly', 'success' ),
            error: () => {
                this.snack.open( 'Error saving the user', 'Ok', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
                });
            }
        });
    }
}