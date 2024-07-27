export class AuthorEntity {

    public authorId: string;
    public name: string;
    public email: string;
    public active: boolean;

    constructor( authorId: string, name: string, email: string, active: boolean){
        this.authorId = authorId;
        this.name = name;
        this.email = email;   
        this.active = active;     
    }  

}