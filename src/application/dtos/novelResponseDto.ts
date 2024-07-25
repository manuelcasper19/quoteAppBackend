import { AuthorDto } from "./authorDto";
import { BaseLiteryWorkResponseDto } from "./literyworResponseDto";

export class NovelResponseDto extends BaseLiteryWorkResponseDto {
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
        super('NOVEL', literyWorkId, title, authors, url, status, publicationYear, stock, price);
    }
}