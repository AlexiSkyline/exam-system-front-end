import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { Question } from '../../../models/Question';
import { tap } from 'rxjs';
import { Questionnaire } from '../../../models/Questionnaire';
import { Category } from '../../../models/Category';

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

        this.questionService.getQuestionsByExamen( this.idQuestionnaire ).pipe(
            tap(( data ) => {
                this.buildQuestions( data );
                console.log( this.listQuestions );
            })
        ).subscribe();
    }

    private buildQuestions( data: any ): void {
        data.forEach(( question: any ) => {
            const currentCategory = new Category( question.exam.category.id, question.exam.category.title, question.exam.category.description );
            const currentQuestionnaire = new Questionnaire( question.exam.id, question.exam.title, question.exam.description, question.exam.maxPoints, question.exam.numberQuestions,
                question.exam.status, currentCategory );
            this.listQuestions.push( new Question( question.id, question.content, question.image, question.option1, question.option2, question.option3, question.option4,
                question.answer, currentQuestionnaire ) );
        });
    }
}
