export class Category {
    private id: number;
    private title: string;
    private description: string;

    constructor( id?: number, title?: string, description?: string ) {
        this.id = id || 0;
        this.title = title || '';
        this.description = description || '';
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

    public validateFields(): string {
        if( this.title.trim() === '' || this.title === null ) {
            return 'The Category title is required!!';
        }

        if( this.description.trim() === '' || this.description === null ) {
            return 'The Category Description is required!!';
        }

        return '';
    }
}