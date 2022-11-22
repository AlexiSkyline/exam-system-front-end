import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../models/Question';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../../services/question.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Questionnaire } from 'src/app/models/Questionnaire';

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
        this.question.getQuestionnaire.setId = this.idQuestionnaire;

        this.questionnaireService.getQuestionnaireById( this.idQuestionnaire ).pipe(
            tap(( data: any ) => {
                this.question.setQuestionnaire = new Questionnaire( data.id, data.title, data.description, data.maxPoints, data.status, data.numberQuestions, data.category )
                console.log( this.question );
            })
        ).subscribe();
    }

    public onSubmit(): void {
        const errorMessage = this.question.validateFields();
        if( errorMessage !== '' ) {
            this.snack.open( errorMessage,  'Ok', {
                duration: 3000
            });
            return;
        }

        this.questionService.saveQuestions( this.question ).subscribe({
            next: () => {
                Swal.fire( 'Question added', 'Question successfully added', 'success' );
            },
            error: () => {
                Swal.fire( 'Error', 'Error when saving the Question', 'error' );
            }
        });

        this.router.navigate([ `/admin/view-questions/${ this.idQuestionnaire }/${ this.title }` ]);
    }
}
