import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    constructor( public login: LoginService ) {}

    ngOnInit(): void {}

    public logOut() {
        this.login.logOut();
        window.location.reload();
    }
}
