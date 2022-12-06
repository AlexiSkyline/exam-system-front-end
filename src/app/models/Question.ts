import { Questionnaire } from './Questionnaire';
export class Question {
    public id: number;
    public content: string;
    public image: string;
    public option1: string;
    public option2: string;
    public option3: string;
    public option4: string;
    public answer: string;
    public userAnswer: string;
    public questionnaire: Questionnaire;

    constructor( id?: number, content?: string, image?: string, option1?: string, option2?: string, option3?: string, option4?: string, answer?: string, questionnaire?: Questionnaire, userAnswer?: string ) {
        this.id = id || 0;
        this.content = content || '';
        this.image = image || '';
        this.option1 = option1 || '';
        this.option2 = option2 || '';
        this.option3 = option3 || '';
        this.option4 = option4 || '';
        this.answer = answer || '';
        this.questionnaire = questionnaire || new Questionnaire();
        this.userAnswer = userAnswer || '';
    }

    public static validateFields( question: Question ): string {
        if( question.content.trim() === '' || question.content === null ) {
            return 'The Question content is required!!';
        }

        if( question.option1.trim() === '' || question.option1 === null ) {
            return 'The Question option 1 is required!!';
        }
        
        if( question.option2.trim() === '' || question.option2 === null ) {
            return 'The Question option 2 is required!!';
        }

        if( question.option3.trim() === '' || question.option3 === null ) {
            return 'The Question option 3 is required!!';
        }

        if( question.option4.trim() === '' || question.option4 === null ) {
            return 'The Question option 4 is required!!';
        }

        if( question.answer.trim() === '' || question.answer === null ) {
            return 'The Question answer is required!!';
        }

        return '';
    }
}