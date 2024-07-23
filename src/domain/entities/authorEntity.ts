export class AuthorEntity {

    private authorId: string;
    private name: string;
    private email: string;

    constructor( authorId: string, name: string, email: string){
        this.authorId = authorId;
        this.name = name;
        this.email = email;        
    }
   

}