import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

import { Question } from '../../../models/Question';
import { Category } from '../../../models/Category';
import { QuestionService } from '../../../services/question.service';
import { Questionnaire } from '../../../models/Questionnaire';
import { ResponseBody } from 'src/app/models/ResponseBody';

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
            tap(( response: ResponseBody<Question[]> ) =>{
                this.listQuestions = response.data as Question[];
                this.timer = this.listQuestions.length * 2 * 60;
                this.listQuestions.forEach(( question: Question ) => {
                    question.userAnswer = '';
                });
                this.startTimer();
            })
        ).subscribe();
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
        this.questionService.markQuestions( this.listQuestions ).pipe(
            tap(( response: any ) => {
                this.pointsEarned = response.data.maximumPoints;
                this.correctAnswers = response.data.correctAnswers;
                this.attempts = response.data.attempts;
                this.isSent = true;
            })
        ).subscribe()
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

    public printScreen(): void {
        window.print();
    }
}
