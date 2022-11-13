export class Login {
    private username: string = '';
    private password: string = '';

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
}