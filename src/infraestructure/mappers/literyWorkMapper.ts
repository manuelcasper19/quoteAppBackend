import { Document, Schema } from 'mongoose';
import { AuthorEntity, BookEntity, Genre, KnowlodgeArea, LiteryWorkDirector, LiteryWorkEntity, LiteryWorkStatus, NovelEntity } from '../../domain';
import { IAuthor, IBook, ILiteryWorkBase, INovel } from '../schemas';

type LiteryWorkPersistence = ((ILiteryWorkBase & Document) | (IBook & Document) | (INovel & Document)) & {
    authors: (Schema.Types.ObjectId | IAuthor)[];
};


export class LiteryWorkMapper {   
    static toPersisTenceEntity(domainEntity: LiteryWorkEntity): Omit<LiteryWorkPersistence, keyof Document> {       
    const baseEntity: Omit<ILiteryWorkBase, keyof Document> = {
        title: domainEntity.title,
        url: domainEntity.url,
        publicationYear: domainEntity.publicationYear,
        price: domainEntity.price,
        stock: domainEntity.stock,
        authors: domainEntity.authors.map(author => new Schema.Types.ObjectId(author.authorId)),
        status: domainEntity.status,
        type: domainEntity instanceof NovelEntity ? 'NOVEL' : 'BOOK'
    };

    if (domainEntity instanceof NovelEntity) {
        return {
            ...baseEntity,
            genres: domainEntity.genres,
            readingAge: domainEntity.readingAge
        } as Omit<INovel, keyof Document>;
    } else if (domainEntity instanceof BookEntity) {
        return {
            ...baseEntity,
            pages: domainEntity.pages,
            knowledgeAreas: domainEntity.KnowlodgeAreas
        } as Omit<IBook, keyof Document>;
    }

    return baseEntity;
}

static toDomainEntity(persistence: LiteryWorkPersistence, director: LiteryWorkDirector): LiteryWorkEntity {
    const authors = (persistence.authors as IAuthor[]).map(author =>
        new AuthorEntity(author.authorId.toString(), author.name, author.email, author.active )
    );

    return (persistence.type === 'NOVEL' ?
        director.createNovel(
            persistence.id,
            (persistence as INovel).genres.map(g => Genre[g as keyof typeof Genre]),
            (persistence as INovel).readingAge,
            persistence.title,
            persistence.url,
            persistence.publicationYear,
            persistence.price,
            persistence.stock,
            authors,
            LiteryWorkStatus[persistence.status as keyof typeof LiteryWorkStatus])
        :
            director.createBook(
            persistence.id,
            persistence.title,
            persistence.url,
            persistence.publicationYear,
            persistence.price,
            persistence.stock,
            authors,
            (persistence as IBook).knowledgeAreas.map(ka => KnowlodgeArea[ka as keyof typeof KnowlodgeArea]),
            (persistence as IBook).pages,
            LiteryWorkStatus[persistence.status as keyof typeof LiteryWorkStatus])

    )
}
}