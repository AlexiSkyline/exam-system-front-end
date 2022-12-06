import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from '../../../services/category.service';
import { tap } from 'rxjs';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
    public listCategory: Array<Category> = [];
    constructor( private categoryService: CategoryService ) {}

    ngOnInit(): void {
        this.categoryService.getCategories()
        .pipe( tap(( response: ResponseBody<Category[]> ) => this.listCategory = response.data as Category[] ) )
        .subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading categories', 'error' ) });
    }
}