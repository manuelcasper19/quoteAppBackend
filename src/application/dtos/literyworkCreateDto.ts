import { AuthorDto } from './';

export class LiteryWorkCreateDto {

  constructor(  public type: string,
                public id: string,
                public title: string,
                public authors: AuthorDto[],
                public url: string,
                public status: string,
                public publicationYear: number,
                public stock: number ,
                public genres: string[],
                public knowledgeAreas: string[],
                public price: number,
                public pages: number,
                public readingAge: number ){}
}