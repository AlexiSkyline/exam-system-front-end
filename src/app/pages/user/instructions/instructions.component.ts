import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../../../models/Questionnaire';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
    public idQuestionnaire: number = 0;
    public questionnaire: Questionnaire = new Questionnaire();
    public maxPoints: number = 0;
    constructor( private questionnaireService: QuestionnaireService, private route: ActivatedRoute, private router: Router ) {}

    ngOnInit(): void {
        this.idQuestionnaire = this.route.snapshot.params[ 'id' ];
        this.questionnaireService.getQuestionnaireById( this.idQuestionnaire ).pipe( tap(( data: any ) => this.buildQuestionnaire( data ))).subscribe();
    }

    public start() {
        Swal.fire({
            title:'Do you want to start the Questionnaire?',
            showCancelButton:true,
            cancelButtonText:'Cancel',
            confirmButtonText:'Start',
            icon:'info'
        }).then((result:any) => {
            if( result.isConfirmed ){
                this.router.navigate([ '/start/' + this.idQuestionnaire ]);
            }
        });
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
