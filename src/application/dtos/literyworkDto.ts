import { AuthorDto } from './authorDto';

export abstract class BaseLiteryWorkDto {
    constructor(
        public literyWorkId: string,
        public title: string,
        public authors: AuthorDto[],
        public url: string,
        public status: string,
        public publicationYear: number,
        public stock: number,
        public price: number
    ) {}

    abstract get type(): 'NOVEL' | 'BOOK';
}

export class NovelDto extends BaseLiteryWorkDto {
    constructor(
        literyWorkId: string,
        title: string,
        authors: AuthorDto[],
        url: string,
        status: string,
        publicationYear: number,
        stock: number,
        price: number,
        public genres: string[],
        public readingAge: number
    ) {
        super(literyWorkId, title, authors, url, status, publicationYear, stock, price);
    }

    get type(): 'NOVEL' {
        return 'NOVEL';
    }
}

export class BookDto extends BaseLiteryWorkDto {
    constructor(
        literyWorkId: string,
        title: string,
        authors: AuthorDto[],
        url: string,
        status: string,
        publicationYear: number,
        stock: number,
        price: number,
        public knowledgeAreas: string[],
        public pages: number
    ) {
        super(literyWorkId, title, authors, url, status, publicationYear, stock, price);
    }

    get type(): 'BOOK' {
        return 'BOOK';
    }
}

export type LiteryWorkDto = NovelDto | BookDto;