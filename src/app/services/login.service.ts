import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import URL_SERVICE from './helper';

import { Login } from '../models/Login';
import { User } from '../models/User';
import { Role } from '../models/Role';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor( private httpClient: HttpClient ) {}
    
    public login( login: Login ) {
        return this.httpClient.post( `${ URL_SERVICE }/login`, login );
    }

    public loginUser( token: any ): void {
        localStorage.setItem( 'token', token );
    }

    public isLoggedIn(): boolean {
        const localToken = localStorage.getItem( 'token' ) || [];
        if( localToken.length == 0 ) {
            return false;
        }

        return true;
    }

    public logOut(): void {
        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'user' );
    }

    public getToken(): string | null {
        return localStorage.getItem( 'token' );
    }

    public setUser( user: User ): void {
        localStorage.setItem( 'user', JSON.stringify( user ) );
    }

    public getUser() {
        const localUser = localStorage.getItem( 'user' );
        if( localUser != null ) {
            return JSON.parse( localUser );
        }

        this.logOut();
        return null;
    }
    
    public getUserRole(): Array<Role> {
        return this.getUser().roles;
    }

    public getCurrentUser() {
       return this.httpClient.get( `${ URL_SERVICE }/current-user`, );
    }
}