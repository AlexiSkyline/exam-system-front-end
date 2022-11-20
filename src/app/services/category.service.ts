import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import URL_SERVICE from './helper';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor( private httpClient: HttpClient ) {}

    public getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>( `${ URL_SERVICE }/category/` );
    }

    public saveCategory( category: Category ) {
        return this.httpClient.post( `${ URL_SERVICE }/category/`, category );
    }
}