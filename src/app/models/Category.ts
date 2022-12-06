export class Category {
    public id: number;
    public title: string;
    public description: string;

    constructor( id?: number, title?: string, description?: string ) {
        this.id = id || 0;
        this.title = title || '';
        this.description = description || '';
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