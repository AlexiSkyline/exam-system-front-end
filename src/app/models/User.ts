export class User {
    private username: string = '';
    private password: string = '';
    private name: string = '';
    private surname: string = '';
    private email: string = '';
    private phoneNumber: string = '';

    public set setUsername( username: string ) {
        this.username = username;
    }
    public get getUsername(): string {
        return this.username;
    }

    public set setPassword( password: string ) {
        this.password = password;
    }
    public get getPassword(): string {
        return this.password;
    }
    
    public set setName( name: string ) {
        this.name = name;
    }
    public get getname(): string {
        return this.name;
    }

    public set setSurname( surname: string ) {
        this.surname = surname;
    }
    public get getSurname(): string {
        return this.surname;
    }

    public set setEmail( email: string ) {
        this.email = email;
    }
    public get getEmail(): string {
        return this.email;
    }

    public set setPhoneNumber( phoneNumber: string ) {
        this.phoneNumber = phoneNumber;
    }
    public get getPhoneNumber(): string {
        return this.phoneNumber;
    }
}