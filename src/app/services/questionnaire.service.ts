import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../models/Questionnaire';
import URL_SERVICE from './helper';
import { ResponseBody } from '../models/ResponseBody';

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
    constructor( private httpClient: HttpClient ) {}

    public getQuestionnaires(): Observable<ResponseBody<Questionnaire[]>> {
        return this.httpClient.get<ResponseBody<Questionnaire[]>>( `${ URL_SERVICE }/questionnaire/` );
    }

    public saveQuestionnaires( questionnaire: Questionnaire ): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.post<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/`, questionnaire );
    }

    public deleteQuestionnaires( id: number ): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.delete<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/${ id }/` );
    }

    public getQuestionnaireById( id: Number ): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.get<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/${ id }/` );
    }

    public updateQuestionnaire( questionnaire: Questionnaire ): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.put<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/`, questionnaire );
    }

    public getAllQuestionnairesByCategory( id: number ): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.get<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/category/${ id }` );
    }

    public getAllQuestionnairesActives(): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.get<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/active`);
    }

    public getAllQuestionnairesActivesByCategory( id: number ): Observable<ResponseBody<Questionnaire>> {
        return this.httpClient.get<ResponseBody<Questionnaire>>( `${ URL_SERVICE }/questionnaire/category/active/${ id }` );
    }
}