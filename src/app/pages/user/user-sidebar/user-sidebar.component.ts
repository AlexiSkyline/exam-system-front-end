import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../models/Category';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
    public listCategory: Category[] = [];
    constructor( private categoryService: CategoryService ) { }

    ngOnInit(): void {
        this.categoryService.getCategories()
        .pipe( tap(( response: ResponseBody<Category[]> ) => this.listCategory = response.data as Category[] ) )
        .subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading categories', 'error' ) });
    }
}
