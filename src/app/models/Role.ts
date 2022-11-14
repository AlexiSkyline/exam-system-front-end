export class Role {
    private id: number = 0;
    private name: string = '';

    public set setId( id: number ) {
        this.id = id;
    }
    public get getId(): number {
        return this.id;
    }

    public set setName( name: string ) {
        this.name = name;
    }
    public get getName(): string {
        return this.name;
    }
}