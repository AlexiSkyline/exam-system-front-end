import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { CategoryService } from '../../../services/category.service';
import { QuestionnaireService } from '../../../services/questionnaire.service';

import { Category } from '../../../models/Category';
import { Questionnaire } from '../../../models/Questionnaire';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-add-questionnaire',
  templateUrl: './add-questionnaire.component.html',
  styleUrls: ['./add-questionnaire.component.css']
})
export class AddQuestionnaireComponent implements OnInit {
    public listCategory: Array<Category> = [];
    public questionnaire: Questionnaire = new Questionnaire();
    public idCategory: number = 0;
    constructor( private categoryService: CategoryService, private snack: MatSnackBar, private questionnaireService: QuestionnaireService, private router: Router ) {}

    ngOnInit(): void {
        this.categoryService.getCategories()
        .pipe( tap(( response: ResponseBody<Category[]> ) => this.listCategory = response.data as Category[] ) )
        .subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading categories', 'error' ) });
    }

    public onSubmit(): void {
        const category = this.listCategory.filter( category => category.id === this.idCategory );
        this.questionnaire.setCategory = category[0];
        const errorMessage = this.questionnaire.validateFields();
        if( errorMessage !== '' ) {
            this.snack.open( errorMessage,  'Ok', {
                duration: 3000
            });
            return;
        }
    
        this.questionnaireService.saveQuestionnaires( this.questionnaire ).subscribe({
            next: () => {
                Swal.fire( 'Questionnaire added', 'Questionnaire successfully added', 'success' );
                this.router.navigate([ '/admin/questionnaires' ]);
            },
            error: () => {
                Swal.fire( 'Error', 'Error when saving the Questionnaire', 'error' );
            }
        });        
    }
}