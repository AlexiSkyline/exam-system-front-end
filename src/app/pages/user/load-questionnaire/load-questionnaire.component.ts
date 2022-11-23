import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Questionnaire } from '../../../models/Questionnaire';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-load-questionnaire',
  templateUrl: './load-questionnaire.component.html',
  styleUrls: ['./load-questionnaire.component.css']
})
export class LoadQuestionnaireComponent implements OnInit {
    private idCategory: number = 0;
    public listQuestionnaire: Questionnaire[] = [];
    constructor( private route: ActivatedRoute, private questionnaireService: QuestionnaireService ) {}

    ngOnInit(): void {
        this.route.params.subscribe(( params ) => {
            this.listQuestionnaire = [];
            this.idCategory = params[ 'id' ];

            if( this.idCategory == 0 ) {
                this.questionnaireService.getAllQuestionnairesActives().pipe(
                    tap(( data: any ) => data.forEach(( questionnaire: any ) =>{
                        const category = new Category( questionnaire.category.id, questionnaire.category.title, questionnaire.category.description  );
                        this.listQuestionnaire.push( new Questionnaire( questionnaire.id, questionnaire.title, questionnaire.description, 
                            questionnaire.maxPoints, questionnaire.numberQuestions, questionnaire.status, category  ) )} ))
                ).subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
            } else {
                this.questionnaireService.getAllQuestionnairesActivesByCategory( this.idCategory ).pipe(
                    tap(( data: any ) => data.forEach(( questionnaire: any ) =>{
                        const category = new Category( questionnaire.category.id, questionnaire.category.title, questionnaire.category.description  );
                        this.listQuestionnaire.push( new Questionnaire( questionnaire.id, questionnaire.title, questionnaire.description, 
                            questionnaire.maxPoints, questionnaire.numberQuestions, questionnaire.status, category  ) )} ))
                ).subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
            }
        });
    }
}