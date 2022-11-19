import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
    public listCategory: Array<Category> = [];
    constructor( private categoryService: CategoryService ) {}

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe({
            next: ( data: any ) => {
                data.forEach(( category: any )=> this.listCategory.push( new Category( category.id, category.title, category.description ) ) );
            },
            error: () => {
                Swal.fire( 'Error!!', 'Error loading categories', 'error' );
            }
        });
    }
}