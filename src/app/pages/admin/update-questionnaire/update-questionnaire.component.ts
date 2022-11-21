import Swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { Category } from 'src/app/models/Category';
import { Questionnaire } from '../../../models/Questionnaire';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-questionnaire',
  templateUrl: './update-questionnaire.component.html',
  styleUrls: ['./update-questionnaire.component.css']
})
export class UpdateQuestionnaireComponent implements OnInit {
    private idQuestionnaire: number = 0;
    public listCategory: Category[] = [];
    public idCategory: number = 0;
    public questionnaire: Questionnaire = new Questionnaire();
    constructor( private route: ActivatedRoute, private questionnaireService: QuestionnaireService,
        private categoryService: CategoryService, private snack: MatSnackBar, private router: Router ) {}

    ngOnInit(): void {
        this.idQuestionnaire = this.route.snapshot.params[ 'id' ];
        this.questionnaireService.getQuestionnaireById( this.idQuestionnaire ).pipe(
            tap(( data: any ) => {
                this.buildQuestionnaire( data );
            }),
        ).subscribe();

        this.categoryService.getCategories().pipe(
            tap(( data ) => data.forEach(( category: any )=> this.listCategory.push( new Category( category.id, category.title, category.description ) ) ))
        ).subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading categories', 'error' ) });
    }

    public updateData(): void {
        const category = this.listCategory.filter( category => category.getId === this.idCategory );
        this.questionnaire.setCategory = category[0];
        const errorMessage = this.questionnaire.validateFields();
        if( errorMessage !== '' ) {
            this.snack.open( errorMessage,  'Ok', {
                duration: 3000
            });
            return;
        }

        this.questionnaireService.updateQuestionnaire( this.questionnaire ).subscribe({
            next: () => Swal.fire( 'Questionnaire Updated', 'Questionnaire successfully updated', 'success' ).then(() => this.router.navigate(['/admin/questionnaires'] ))
            ,error: () => Swal.fire( 'Error', 'Error when updating the Questionnaire', 'error' )
        });
    }

    private buildQuestionnaire( data: any ): void {
        this.questionnaire.setId = data.id;
        this.questionnaire.setTitle = data.title;
        this.questionnaire.setDescription = data.description;
        this.questionnaire.setMaxPoints = data.maxPoints;
        this.questionnaire.setNumberQuestions = data.numberQuestions;
        this.questionnaire.setStatus = data.status;
        this.questionnaire.setCategory = new Category( data.category.id, data.category.title, data.category.description  );
        this.idCategory = data.category.id;
    }
}