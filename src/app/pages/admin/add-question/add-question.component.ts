import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../models/Question';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../../services/question.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Questionnaire } from 'src/app/models/Questionnaire';
import { ResponseBody } from '../../../models/ResponseBody';
import { getMessageError } from '../../../models/ResponseException';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
    public idQuestionnaire: number = 0;
    public title: string = '';
    public question: Question = new Question();
    constructor( private route: ActivatedRoute, private questionnaireService: QuestionnaireService,
        private snack: MatSnackBar, private questionService: QuestionService, private router: Router ) { }

    ngOnInit(): void {
        this.idQuestionnaire = this.route.snapshot.params[ 'id' ];
        this.title = this.route.snapshot.params[ 'title' ];
        this.question.questionnaire.id = this.idQuestionnaire;

        this.questionnaireService.getQuestionnaireById( this.idQuestionnaire )
        .pipe( tap(( response: ResponseBody<Questionnaire> ) => this.question.questionnaire = response.data as Questionnaire ))
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

        this.questionService.saveQuestions( this.question )
        .pipe( tap(( response: ResponseBody<Question> ) => {
            Swal.fire( 'Question Updated', response.message, 'success' );
            this.router.navigate([ `/admin/view-questions/${ this.idQuestionnaire }/${ this.title }` ]);
        }))
        .subscribe({ error: ( response: any ) => {
            const message = getMessageError( response );
            Swal.fire( 'Error',  message, 'error' )
        }});
    }
}
