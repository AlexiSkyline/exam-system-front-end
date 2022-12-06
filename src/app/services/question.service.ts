import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/Question';
import URL_SERVICE from './helper';
import { ResponseBody } from '../models/ResponseBody';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    constructor( private httpClient: HttpClient ) {}

    public getQuestionsByExamen( id: number ): Observable<ResponseBody<Question[]>> {
        return this.httpClient.get<ResponseBody<Question[]>>( `${ URL_SERVICE }/question/questionnaire/${ id }/` );
    }

    public saveQuestions( question: Question ): Observable<ResponseBody<Question>> {
        return this.httpClient.post<ResponseBody<Question>>( `${ URL_SERVICE }/question/`, question );
    }

    public deleteQuestion( id: number ): Observable<ResponseBody<Question>> {
        return this.httpClient.delete<ResponseBody<Question>>( `${ URL_SERVICE }/question/${ id }/` );
    }

    public updateQuestion( question: Question ): Observable<ResponseBody<Question>> {
        return this.httpClient.put<ResponseBody<Question>>( `${ URL_SERVICE }/question/`, question );
    }

    public getQuestionById( id: number ): Observable<ResponseBody<Question>> {
        return this.httpClient.get<ResponseBody<Question>>( `${ URL_SERVICE }/question/${ id }/` );
    }

    public markQuestions( question: Question[] ): Observable<ResponseBody<Object>> {
        return this.httpClient.post<ResponseBody<Object>>( `${ URL_SERVICE }/question/mark-questionnaire/`, question );
    }
}