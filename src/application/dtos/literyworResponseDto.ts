import { AuthorDto } from './authorDto';

export class LiteryWorkResponseDto {

    constructor(    public type: string,
                    public literyWorkId: string,
                    public title: string,
                    public authors: AuthorDto[],
                    public url: string,
                    public status: string,
                    public publicationYear: number,
                    public stock: number,
                    public price: number,
                    public genres?: string[],
                    public knowledgeAreas?: string[],
                    public pages?: number,
                    public readingAge?: number ){}
            }