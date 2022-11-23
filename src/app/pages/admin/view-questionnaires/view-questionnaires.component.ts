import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Questionnaire } from '../../../models/Questionnaire';
import { tap } from 'rxjs';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-view-questionnaires',
  templateUrl: './view-questionnaires.component.html',
  styleUrls: ['./view-questionnaires.component.css']
})
export class ViewQuestionnairesComponent implements OnInit {
    public listQuestionnaire: Questionnaire[] = [];
    constructor( private questionnaireService: QuestionnaireService ) {}

    ngOnInit(): void {
        this.questionnaireService.getQuestionnaires().pipe(
            tap(( data ) => data.forEach(( questionnaire: any ) =>{
                const category = new Category( questionnaire.category.id, questionnaire.category.title, questionnaire.category.description  );
                this.listQuestionnaire.push( new Questionnaire( questionnaire.id, questionnaire.title, questionnaire.description, 
                    questionnaire.maxPoints, questionnaire.numberQuestions, questionnaire.status, category  ) )} ))
        ).subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
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
                        this.listQuestionnaire = this.listQuestionnaire.filter(( questionnaire: Questionnaire ) => questionnaire.getId !== id );
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