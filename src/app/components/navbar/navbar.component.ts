import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public isLoggedIn = false;
    public currentUser: any = null;
    constructor( public loginService: LoginService ) { }

    ngOnInit(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.currentUser = this.loginService.getUser();
        this.loginService.loginStatusSubject.asObservable().subscribe( data => {
            this.isLoggedIn = this.loginService.isLoggedIn();
            this.currentUser = this.loginService.getUser();
        });
    }

    public logOut(): void {
        this.loginService.logOut();
        window.location.reload();
    }
}