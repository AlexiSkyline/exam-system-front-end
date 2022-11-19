import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
    public category: Category = new Category();
    constructor( private categoryService: CategoryService, private snack: MatSnackBar, private router: Router ) {}

    ngOnInit(): void {
    }

    public onSubmit(): void {
        if( this.category.getTitle.trim() == '' || this.category.getTitle == null ) {
            this.snack.open( 'The title is required!!' );
            return;
        }

        this.categoryService.saveCategory( this.category ).subscribe({
            next: () => {
                Swal.fire( 'Category added', 'Category successfully added', 'success' );
            },
            error: () => {
                Swal.fire( 'Error', 'Error when saving the category', 'error' );
            }
        });

        this.router.navigate([ '/admin/category' ]);
    }
}