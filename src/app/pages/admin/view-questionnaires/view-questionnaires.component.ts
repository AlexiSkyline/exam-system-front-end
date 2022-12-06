import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Questionnaire } from '../../../models/Questionnaire';
import { tap } from 'rxjs';
import { Category } from '../../../models/Category';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-view-questionnaires',
  templateUrl: './view-questionnaires.component.html',
  styleUrls: ['./view-questionnaires.component.css']
})
export class ViewQuestionnairesComponent implements OnInit {
    public listQuestionnaire: Questionnaire[] = [];
    constructor( private questionnaireService: QuestionnaireService ) {}

    ngOnInit(): void {
        this.questionnaireService.getQuestionnaires()
        .pipe( tap(( response: ResponseBody<Questionnaire[]> ) => this.listQuestionnaire = response.data as Questionnaire[] ))
        .subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
    }

    public deleteQuestionnaire( id: number ): void {
        Swal.fire({
            title:'Delete Questionnaire',
            text:'Are you sure to remove the Questionnaire?',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Delete',
            cancelButtonText:'Cancel'
        }).then((result) => {
            if( result.isConfirmed ){
                this.questionnaireService.deleteQuestionnaires( id ).subscribe({
                    next: () => {
                        this.listQuestionnaire = this.listQuestionnaire.filter(( questionnaire: Questionnaire ) => questionnaire.id !== id );
                        Swal.fire( 'Questionnaire eliminated', 'The Questionnaire has been removed from the database.', 'success' );
                    },
                    error: () => {
                        Swal.fire( 'Error', 'Error deleting the Questionnaire', 'error' );
                    }
                });
            }
        });
    }
}