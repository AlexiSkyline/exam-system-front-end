import { Category } from './Category';

export class Questionnaire {
    public id: number;
    public title: string;
    public description: string;
    public maxPoints: number;
    public status: boolean;
    public numberQuestions: number;
    public category: Category;

    constructor( id?: number, title?: string, description?: string, maxPoints?: number, numberQuestions?: number, status?: boolean, category?: Category ) {
        this.id = id || 0;
        this.title = title || '';
        this.description = description || '';
        this.maxPoints = maxPoints || 0;
        this.numberQuestions = numberQuestions || 0;
        this.status = status || false;
        this.category = category || new Category();
    }

    public static validateFields( questionnaire: Questionnaire ): string {
        if( questionnaire.title.trim() === '' || questionnaire.title === null ) {
            return 'The Questionnaire title is required!!';
        }

        if( questionnaire.description.trim() === '' || questionnaire.description === null ) {
            return 'The Questionnaire Description is required!!';
        }
        
        if( questionnaire.maxPoints === 0 || questionnaire.maxPoints === null ) {
            return 'The Questionnaire Max Points is required!!';
        }
        
        if( questionnaire.numberQuestions === 0 || questionnaire.numberQuestions === null ) {
            return 'The Questionnaire Number Questions is required!!';
        }

        if( typeof questionnaire.category === 'undefined' ) {
            return 'The Questionnaire Category is Required!!';
        }

        return '';
    }
}