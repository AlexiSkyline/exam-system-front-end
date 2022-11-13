import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public login: Login = new Login;
    constructor() { }

    ngOnInit(): void {
    }
}