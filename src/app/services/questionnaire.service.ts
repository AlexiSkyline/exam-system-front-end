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
}