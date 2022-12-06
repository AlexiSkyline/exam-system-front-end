import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ResponseBody } from '../../../models/ResponseBody';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
    public category: Category = new Category();
    constructor( private categoryService: CategoryService, private snack: MatSnackBar, private router: Router ) {}

    ngOnInit(): void {}

    public onSubmit(): void {
        const errorMessage = this.category.validateFields();
        if( errorMessage !== '' ) {
            this.snack.open( errorMessage,  'Ok', {
                duration: 3000
            });
            return;
        }

        this.categoryService.saveCategory( this.category ).pipe(
            tap(( response: ResponseBody<Category> ) => Swal.fire( 'Category added', response.message, 'success' ))
        ).subscribe({ error: () => Swal.fire( 'Error', 'Error when saving the category', 'error' ) });
        this.router.navigate([ '/admin/category' ]);
    }
}