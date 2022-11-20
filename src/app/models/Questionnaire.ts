import { Category } from './Category';

interface IBuilder<T> {
    build(): T;
}

export class Questionnaire {
    private id: number;
    private title: string;
    private description: string;
    private maxPoints: string;
    private numberQuestions: number;
    private category: Category;

    constructor( id?: number, title?: string, description?: string, maxPoints?: string, numberQuestions?: number, category?: Category ) {
        this.id = id || 0;
        this.title = title || '';
        this.description = description || '';
        this.maxPoints = maxPoints || '';
        this.numberQuestions = numberQuestions || 0;
        this.category = category || new Category();
    }

    public set setId( id: number ) {
        this.id = id;
    }
    public get getId(): number {
        return this.id;
    }

    public set setTitle( title: string ) {
        this.title = title;
    }
    public get getTitle(): string {
        return this.title;
    }

    public set setDescription( description: string ) {
        this.description = description;
    }
    public get getDescription(): string {
        return this.description;
    }

    public set setMaxPoints( maxPoints: string ) {
        this.maxPoints = maxPoints;
    }
    public get getMaxPoints(): string {
        return this.maxPoints;
    }

    public set setNumberQuestions( numberQuestions: number ) {
        this.numberQuestions = numberQuestions;
    }
    public get getNumberQuestions(): number {
        return this.numberQuestions;
    }

    public set setCategory( category: Category ) {
        this.category = category;
    }
    public get getCategory(): Category {
        return this.category;
    }
}