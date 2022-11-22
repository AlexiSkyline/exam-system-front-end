import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/Question';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Questionnaire } from 'src/app/models/Questionnaire';
import { Category } from 'src/app/models/Category';

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
        this.questionService.getQuestionById( this.idQuestion ).pipe(
            tap(( data: Question ) => {
                this.buildQuestion( data );
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

        this.questionService.updateQuestion( this.question ).subscribe({
            next: () => Swal.fire( 'Question Updated', 'Question successfully updated', 'success' ).then(() => { 
                this.router.navigate([ `/admin/view-questions/${ this.question.getQuestionnaire.getId }/${ this.question.getQuestionnaire.getTitle }` ] )
            })
            ,error: () => Swal.fire( 'Error', 'Error when updating the Question', 'error' )
        });
    }

    private buildQuestion( data: any ): void {
        this.question.setId = data.id;
        this.question.setContent = data.content;
        this.question.setImage = data.image;
        this.question.setOption1 = data.option1;
        this.question.setOption2 = data.option2;
        this.question.setOption3 = data.option3;
        this.question.setOption4 = data.option4;
        this.question.setAnswer = data.answer;
        this.question.setQuestionnaire = new Questionnaire(
            data.exam.id,
            data.exam.title,
            data.exam.description,
            data.exam.maxPoints,
            data.exam.numberQuestions,
            data.exam.status,
            new Category( data.exam.category.id, data.exam.category.title, data.exam.category.description )
        );

        this.answer = data.answer;
    }
}
