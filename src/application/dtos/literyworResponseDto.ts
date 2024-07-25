import { AuthorDto } from './authorDto';

export class BaseLiteryWorkResponseDto {
    constructor(
        public type: 'NOVEL' | 'BOOK',
        public literyWorkId: string,
        public title: string,
        public authors: AuthorDto[],
        public url: string,
        public status: string,
        public publicationYear: number,
        public stock: number,
        public price: number
    ) {}
}