import { Questionnaire } from './Questionnaire';
export class Question {
    private id: number;
    private content: string;
    private image: string;
    private option1: string;
    private option2: string;
    private option3: string;
    private option4: string;
    private answer: string;
    private exam: Questionnaire;

    constructor( id?: number, content?: string, image?: string, option1?: string, option2?: string, option3?: string, option4?: string, answer?: string, questionnaire?: Questionnaire ) {
        this.id = id || 0;
        this.content = content || '';
        this.image = image || '';
        this.option1 = option1 || '';
        this.option2 = option2 || '';
        this.option3 = option3 || '';
        this.option4 = option4 || '';
        this.answer = answer || '';
        this.exam = questionnaire || new Questionnaire();
    }

    public set setId( id: number ) {
        this.id = id;
    }
    public get getId(): number {
        return this.id;
    }

    public set setContent( content: string ) {
        this.content = content;
    }
    public get getContent(): string {
        return this.content;
    }

    public set setImage( image: string ) {
        this.image = image;
    }
    public get getImage(): string {
        return this.image;
    }

    public set setOption1( option1: string ) {
        this.option1 = option1;
    }
    public get getOption1(): string {
        return this.option1;
    }

    public set setOption2( option2: string ) {
        this.option2 = option2;
    }
    public get getOption2(): string {
        return this.option2;
    }

    public set setOption3( option3: string ) {
        this.option3 = option3;
    }
    public get getOption3(): string {
        return this.option3;
    }

    public set setOption4( option4: string ) {
        this.option4 = option4;
    }
    public get getOption4(): string {
        return this.option4;
    }

    public set setAnswer( answer: string ) {
        this.answer = answer;
    }
    public get getAnswer(): string {
        return this.answer;
    }

    public set setQuestionnaire( questionnaire: Questionnaire ) {
        this.exam = questionnaire;
    }
    public get getQuestionnaire(): Questionnaire {
        return this.exam;
    }

    public validateFields(): string {
        if( this.content.trim() === '' || this.content === null ) {
            return 'The Question content is required!!';
        }

        if( this.option1.trim() === '' || this.option1 === null ) {
            return 'The Question option 1 is required!!';
        }
        
        if( this.option2.trim() === '' || this.option2 === null ) {
            return 'The Question option 2 is required!!';
        }

        if( this.option3.trim() === '' || this.option3 === null ) {
            return 'The Question option 3 is required!!';
        }

        if( this.option4.trim() === '' || this.option4 === null ) {
            return 'The Question option 4 is required!!';
        }

        if( this.answer.trim() === '' || this.answer === null ) {
            return 'The Question answer is required!!';
        }

        return '';
    }
}