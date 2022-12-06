import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { Question } from '../../../models/Question';
import { tap } from 'rxjs';
import { Questionnaire } from '../../../models/Questionnaire';
import { Category } from '../../../models/Category';
import Swal from 'sweetalert2';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-view-questionnaire-questions',
  templateUrl: './view-questionnaire-questions.component.html',
  styleUrls: ['./view-questionnaire-questions.component.css']
})
export class ViewQuestionnaireQuestionsComponent implements OnInit {
    public idQuestionnaire: number = 0;
    public title: string = '';
    public listQuestions: Question[] = [];
    constructor( private route: ActivatedRoute, private questionService: QuestionService ) {}

    ngOnInit(): void {
        this.idQuestionnaire = this.route.snapshot.params[ 'id' ];
        this.title = this.route.snapshot.params[ 'title' ];

        this.questionService.getQuestionsByExamen( this.idQuestionnaire )
        .pipe( tap(( response: ResponseBody<Question[]> ) => this.listQuestions = response.data as Question[] ) )
        .subscribe();
    }

    public deleteQuestionById( id: number ): void {
        Swal.fire({
            title:'Delete Question',
            text:'Are you sure to remove the Question?',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Delete',
            cancelButtonText:'Cancel'
        }).then(( result ) => {
            if( result.isConfirmed ){
                this.questionService.deleteQuestion( id )
                .pipe( tap(( response: ResponseBody<Question> ) => {
                    this.listQuestions = this.listQuestions.filter(( question: Question ) => question.id !== id );
                    Swal.fire( 'Question eliminated', response.message, 'success' );
                }))
                .subscribe({ error: () => Swal.fire( 'Error', 'Error deleting the Question', 'error' ) });
            }
        });
    }
}
