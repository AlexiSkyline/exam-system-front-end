import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import URL_SERVICE from './helper';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor( private httpClient: HttpClient ) {}

    public addUser( user: User ) {
        return this.httpClient.post( `${ URL_SERVICE }/users/`, user );
    }
}