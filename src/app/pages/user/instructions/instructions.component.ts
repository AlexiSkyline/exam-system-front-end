import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../../../models/Questionnaire';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
    public idQuestionnaire: number = 0;
    public questionnaire: Questionnaire = new Questionnaire();
    public maxPoints: number = 0;
    constructor( private questionnaireService: QuestionnaireService, private route: ActivatedRoute ) {}

    ngOnInit(): void {
        this.idQuestionnaire = this.route.snapshot.params[ 'id' ];
        this.questionnaireService.getQuestionnaireById( this.idQuestionnaire ).pipe( tap(( data: any ) => this.buildQuestionnaire( data ))).subscribe();
    }

    private buildQuestionnaire( data: any ): void {
        this.questionnaire.setId = data.id;
        this.questionnaire.setTitle = data.title;
        this.questionnaire.setDescription = data.description;
        this.questionnaire.setMaxPoints = data.maxPoints;
        this.questionnaire.setNumberQuestions = data.numberQuestions;
        this.questionnaire.setStatus = data.status;
        this.questionnaire.setCategory = new Category( data.category.id, data.category.title, data.category.description  );
        this.maxPoints = data.maxPoints != '' ? data.maxPoints : 0;
    }
}
