import Swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { Category } from 'src/app/models/Category';
import { Questionnaire } from '../../../models/Questionnaire';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseBody } from '../../../models/ResponseBody';
import { getMessageError } from '../../../models/ResponseException';

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
        this.questionnaireService.getQuestionnaireById( this.idQuestionnaire )
        .pipe( tap(( response: ResponseBody<Questionnaire> ) =>{ 
            this.questionnaire = response.data as Questionnaire;
            this.idCategory = this.questionnaire.category.id;
        }))
        .subscribe();

        this.categoryService.getCategories()
        .pipe( tap(( response: ResponseBody<Category[]> ) => this.listCategory = response.data as Category[] ) )
        .subscribe({ error: () => { Swal.fire( 'Error!!', 'Error loading categories', 'error' )} });
    }

    public updateData(): void {
        const category = this.listCategory.filter( category => category.id === this.idCategory );
        this.questionnaire.category = category[0];
        const errorMessage = Questionnaire.validateFields( this.questionnaire );
        if( errorMessage !== '' ) {
            this.snack.open( errorMessage,  'Ok', {
                duration: 3000
            });
            return;
        }

        this.questionnaireService.updateQuestionnaire( this.questionnaire )
        .pipe( tap(( response: ResponseBody<Questionnaire> ) => Swal.fire( 'Questionnaire Updated', response.message, 'success' ).then(() => this.router.navigate(['/admin/questionnaires'] ))))
        .subscribe({ error: ( response: any ) => {
            const message = getMessageError( response );
            Swal.fire( 'Error', message, 'error' )
        }});
    }
}