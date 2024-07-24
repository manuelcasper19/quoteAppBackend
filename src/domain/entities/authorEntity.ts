export class AuthorEntity {

    public authorId: string;
    public name: string;
    public email: string;

    constructor( authorId: string, name: string, email: string){
        this.authorId = authorId;
        this.name = name;
        this.email = email;        
    }
   

}