import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Questionnaire } from '../../../models/Questionnaire';
import { Category } from '../../../models/Category';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-load-questionnaire',
  templateUrl: './load-questionnaire.component.html',
  styleUrls: ['./load-questionnaire.component.css']
})
export class LoadQuestionnaireComponent implements OnInit {
    private idCategory: number = 0;
    public listQuestionnaire: Questionnaire[] = [];
    constructor( private route: ActivatedRoute, private questionnaireService: QuestionnaireService, private router: Router ) {}

    ngOnInit(): void {
        this.route.params.subscribe(( params ) => {
            this.listQuestionnaire = [];
            this.idCategory = params[ 'id' ];

            if( this.idCategory == 0 ) {
                this.questionnaireService.getAllQuestionnairesActives()
                .pipe( tap(( response: ResponseBody<Questionnaire[]> ) => this.listQuestionnaire = response.data as Questionnaire[] ))
                .subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
            } else {
                this.questionnaireService.getAllQuestionnairesActivesByCategory( this.idCategory )
                .pipe( tap(( response: ResponseBody<Questionnaire[]> ) => this.listQuestionnaire = response.data as Questionnaire[] ))
                .subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
            }
        });
    }

    public start( idQuestionnaire: number ) {
        Swal.fire({
            title:'Do you want to start the Questionnaire?',
            showCancelButton:true,
            cancelButtonText:'Cancel',
            confirmButtonText:'Start',
            icon:'info'
        }).then((result:any) => {
            if( result.isConfirmed ){
                this.router.navigate([ '/start/' + idQuestionnaire ]);
            }
        });
    }
}