export class Category {
    private id: number = 0;
    private title: string = '';
    private description: string = '';

    constructor( id: number, title: string, description: string ) {
        this.id = id;
        this.title = title;
        this.description = description;
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
}