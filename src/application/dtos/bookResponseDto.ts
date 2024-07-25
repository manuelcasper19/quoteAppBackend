import { AuthorDto } from "./authorDto";
import { BaseLiteryWorkResponseDto } from "./literyworResponseDto";

export class BookResponseDto extends BaseLiteryWorkResponseDto {
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
        super('BOOK', literyWorkId, title, authors, url, status, publicationYear, stock, price);
    }
}