import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../models/Questionnaire';
import URL_SERVICE from './helper';

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
    constructor( private httpClient: HttpClient ) {}

    public getQuestionnaires(): Observable<Questionnaire[]> {
        return this.httpClient.get<Questionnaire[]>( `${ URL_SERVICE }/exam/` );
    }

    public saveQuestionnaires( questionnaire: Questionnaire ){
        return this.httpClient.post( `${ URL_SERVICE }/exam/`, questionnaire );
    }

    public deleteQuestionnaires( id: number ) {
        return this.httpClient.delete( `${ URL_SERVICE }/exam/${ id }/` );
    }

    public getQuestionnaireById( id: Number ): Observable<Questionnaire> {
        return this.httpClient.get<Questionnaire>( `${ URL_SERVICE }/exam/${ id }/` );
    }

    public updateQuestionnaire( questionnaire: Questionnaire ): Observable<Questionnaire> {
        return this.httpClient.put<Questionnaire>( `${ URL_SERVICE }/exam/`, questionnaire );
    }
}