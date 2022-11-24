import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

import { Question } from '../../../models/Question';
import { Category } from '../../../models/Category';
import { QuestionService } from '../../../services/question.service';
import { Questionnaire } from '../../../models/Questionnaire';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
    public idQuestionnaire: number = 0;
    public listQuestions: Question[] = [];
    public pointsEarned: number = 0;
    public correctAnswers: number = 0;
    public attempts: number = 0;
    public isSent: boolean = false;
    public timer: any;
    constructor( private locationStrategy: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService ) {}

    ngOnInit(): void {
        this.disableButtonGoBack();
        this.idQuestionnaire = this.route.snapshot.params['id'];
        this.loadQuestions();
    }

    private disableButtonGoBack(): void {
        history.pushState( null, null!, location.href );
        this.locationStrategy.onPopState(() => {
            history.pushState( null, null!, location.href )
        });
    }

    private loadQuestions() {
        this.questionService.getQuestionsByExamen( this.idQuestionnaire ).pipe(
            tap(( data: any ) =>{
                this.buildQuestions( data );
                this.timer = this.listQuestions.length * 2 * 60;
                this.listQuestions.forEach(( question: Question ) => {
                    question.setUserAnswer = '';
                });
                this.startTimer();
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

    public sendQuestionnaire(): void {
        Swal.fire({
            title: 'Do you want to send the Questionnaire?',
            showCancelButton: true,
            icon:'info',
            cancelButtonText:'Cancel',
            cancelButtonColor:'#3085d6',
            confirmButtonText: 'Send',
            confirmButtonColor: '#d33',
        }).then(( e ) => {
            if( e.isConfirmed ){
                this.assessQuestions();
            }
        });
    }

    private assessQuestions(): void {
        this.isSent = true;
        this.listQuestions.forEach(( questions: Question ) => {
            if( questions.getAnswer == questions.getUserAnswer ) {
                this.correctAnswers++;
                const points = parseInt( this.listQuestions[0].getQuestionnaire.getMaxPoints ) / this.listQuestions.length;
                this.pointsEarned += points;
            }

            if( questions.getUserAnswer.trim() == '' ) {
                this.attempts++;
            }
        });
    }

    private startTimer():void {
        const time = window.setInterval(() => {
            if( this.timer <= 0 ) {
                this.assessQuestions();
                clearInterval( time );
            } else { 
                this.timer--;
            }
        }, 1000);
    }

    public getFormattedTime(): string {
        const mm = Math.floor( this.timer / 60 );
        const ss = this.timer - mm * 60;
        return `${ mm }: ${ ss }`;
    }
}
