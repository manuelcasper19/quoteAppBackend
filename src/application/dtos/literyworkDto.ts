import { AuthorDto } from './authorDto';

export abstract class BaseLiteryWorkDto {
    constructor(
        public literyWorkId: string,
        public title: string,
        public authors: AuthorDto[],
        public url: string,
        public status: string,
        public publicationYear: number,      
        public price: number,
        public copies: CopyLiteryWorkDto[]
    ) {}

    abstract get type(): 'NOVEL' | 'BOOK';
}

export class NovelDto extends BaseLiteryWorkDto {
    constructor(
       public literyWorkId: string,
       public title: string,
       public authors: AuthorDto[],
       public url: string,
       public status: string,
       public publicationYear: number,     
       public price: number,
       public copies: CopyLiteryWorkDto[],
       public genres: string[],
       public readingAge: number
    ) {
        super(literyWorkId, title, authors, url, status, publicationYear,  price, copies);
    }

    get type(): 'NOVEL' {
        return 'NOVEL';
    }
}

export class BookDto extends BaseLiteryWorkDto {
    constructor(
       public literyWorkId: string,
       public title: string,
       public authors: AuthorDto[],
       public url: string,
       public status: string,
       public publicationYear: number,  
       public price: number,
       public copies: CopyLiteryWorkDto[],
       public knowledgeAreas: string[],
       public pages: number
    ) {
        super(literyWorkId, title, authors, url, status, publicationYear,  price, copies );
    }

    get type(): 'BOOK' {
        return 'BOOK';
    }
}

export class CopyLiteryWorkDto {
    constructor(
       public copiesLiteryWorkId: string,
       public acquisitionDate: Date,
       public statusCopy: string){}
}

export type LiteryWorkDto = NovelDto | BookDto;