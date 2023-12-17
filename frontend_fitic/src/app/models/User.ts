export class User {
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public email: string,
    public name: string,
    public lastname: string,
    public isAdmin: boolean,
    public weight?: number,
    public height?: number,

    
  ) {}
}
