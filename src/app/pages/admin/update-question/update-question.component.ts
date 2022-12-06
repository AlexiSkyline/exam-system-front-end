import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/Question';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Questionnaire } from 'src/app/models/Questionnaire';
import { Category } from 'src/app/models/Category';
import { ResponseBody } from '../../../models/ResponseBody';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
    public idQuestion: number = 0;
    public title: string = '';
    public question: Question = new Question();
    public answer: string = '';
    constructor( private route: ActivatedRoute, private questionService: QuestionService, private snack: MatSnackBar, private router: Router ) { }

    ngOnInit(): void {
        this.idQuestion = this.route.snapshot.params[ 'id' ];
        this.questionService.getQuestionById( this.idQuestion )
        .pipe( tap(( response: ResponseBody<Question> ) =>{ 
            this.question = response.data as Question;
            this.answer = this.question.answer;
        }))
        .subscribe();
    }

    public onSubmit(): void {
        const errorMessage = Question.validateFields( this.question );
        if( errorMessage !== '' ) {
            this.snack.open( errorMessage,  'Ok', {
                duration: 3000
            });
            return;
        }

        this.questionService.updateQuestion( this.question )
        .pipe( tap(( response: ResponseBody<Question> ) => 
            Swal.fire( 'Question Updated', response.message, 'success' )
            .then(() => { 
                this.router.navigate([ `/admin/view-questions/${ this.question.questionnaire.id }/${ this.question.questionnaire.title }` ] )
            })
        ))
        .subscribe({ error: () => Swal.fire( 'Error', 'Error when updating the Question', 'error' ) });
    }
}
