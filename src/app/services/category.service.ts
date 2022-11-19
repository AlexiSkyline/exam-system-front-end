import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import URL_SERVICE from './helper';
import { Category } from '../models/Category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor( private httpClient: HttpClient ) {}

    public getCategories() {
        return this.httpClient.get( `${ URL_SERVICE }/category/` );
    }

    public saveCategory( category: Category ) {
        return this.httpClient.post( `${ URL_SERVICE }/category/`, category );
    }
}