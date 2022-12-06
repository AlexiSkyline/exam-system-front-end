import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import URL_SERVICE from './helper';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { ResponseBody } from '../models/ResponseBody';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor( private httpClient: HttpClient ) {}

    public getCategories(): Observable<ResponseBody<Category[]>> {
        return this.httpClient.get<ResponseBody<Category[]>>( `${ URL_SERVICE }/category/` );
    }

    public saveCategory( category: Category ): Observable<ResponseBody<Category>> {
        return this.httpClient.post<ResponseBody<Category>>( `${ URL_SERVICE }/category/`, category );
    }
}