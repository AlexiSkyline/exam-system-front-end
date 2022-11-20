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
    public listQuestionnaire: Array<Questionnaire> = [];
    constructor( private questionnaireService: QuestionnaireService ) {}

    ngOnInit(): void {
        this.questionnaireService.getQuestionnaires().pipe(
            tap(( data ) => data.forEach(( questionnaire: any ) =>{
                const category = new Category( questionnaire.category.id, questionnaire.category.title, questionnaire.category.description  );
                this.listQuestionnaire.push( new Questionnaire( questionnaire.id, questionnaire.title, questionnaire.description, 
                    questionnaire.maxPoints, questionnaire.numberQuestions, category  ) )} ))
        ).subscribe({ error: () =>  Swal.fire( 'Error!!', 'Error loading Questionnaires', 'error' ) });
        console.log( this.listQuestionnaire );
    }
}
