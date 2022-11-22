import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/Question';
import URL_SERVICE from './helper';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    constructor( private httpClient: HttpClient ) {}

    public getQuestionsByExamen( id: number ): Observable<Question[]> {
        return this.httpClient.get<Question[]>( `${ URL_SERVICE }/question/exam/${ id }/` );
    }

    public saveQuestions( question: Question ): Observable<Question> {
        return this.httpClient.post<Question>( `${ URL_SERVICE }/question/`, question );
    }
}