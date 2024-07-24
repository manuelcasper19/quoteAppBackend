import { Document, Schema } from 'mongoose';
import { IliteryWorkRepository, IPaginationOptions, IQueryResult, LiteryWorkEntity } from '../../domain';
import { AuthorEntity, BookEntity, Genre, KnowlodgeArea, LiteryWorkDirector, LiteryWorkStatus, NovelEntity } from '../../domain/entities';
import { LiteryWorkBasePersistence, ILiteryWorkBase, IBook, INovel, NovelPersistence, BookPersistence } from '../schemas/literyworkPersistence';
import { IAuthor } from '../schemas';

type LiteryWorkPersistence = ((ILiteryWorkBase & Document) | (IBook & Document) | (INovel & Document)) & {
    authors: (Schema.Types.ObjectId | IAuthor)[];
};

interface BaseFilter {
    status?: string;
}
export class LiteryWorkRepositoryImpl implements IliteryWorkRepository {

    constructor(private director: LiteryWorkDirector) { }

    async findByAuthor(author: string, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity>> {
        const filter = { author: { $regex: author, $options: 'i' } };
        return this.executeQuery(filter, options);

    }
    async findByGenreNovel(genre: string, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { genre: { $regex: genre, $options: 'i' } };
        return this.executeQuery(filter, options);
    }

    async findById(id: string): Promise<LiteryWorkEntity | null> {

        const literywork = await LiteryWorkBasePersistence.findById(id).populate({
            path: 'authors',
            transform: (doc) => {
                const { _id, __v, ...rest } = doc.toObject();
                return { authorId: _id, ...rest };
            }
        })
        return literywork ? this.toDomainEntity(literywork as LiteryWorkPersistence) : null;
    }
    async findByKnowledgeArea(area: string, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { area: { $regex: area, $options: 'i' } };
        return this.executeQuery(filter, options);
    }
    async findByPublicationYear(year: number, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { publicationYear: { $regex: year, $options: 'i' } };
        return this.executeQuery(filter, options);
    }
    async findByTitle(title: string,  options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { title: { $regex: title, $options: 'i' } };
        return this.executeQuery(filter, options);
    }
    async save(literyWork: LiteryWorkEntity): Promise<LiteryWorkEntity> {
        const persistenceEntity = this.toPersisTenceEntity(literyWork);
        let savedEntity;
        if (literyWork instanceof NovelEntity) {
            savedEntity = await NovelPersistence.create(persistenceEntity);
        } else if (literyWork instanceof BookEntity) {
            savedEntity = await BookPersistence.create(persistenceEntity);
        } else {
            savedEntity = await LiteryWorkBasePersistence.create(persistenceEntity);
        }
    
        return this.toDomainEntity(savedEntity);
    }
    async getAll( options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {   
        return this.executeQuery({}, options);
    }
    private async executeQuery(filter = {}, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity>> {
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;

        let baseFilter: BaseFilter = { status: 'AVAILABLE' };

        if (options.userRole === 'ADMIN_ROLE') {
            baseFilter = {};
        }

        const combinedFilter = { ...baseFilter, ...filter };

        const [literyWorks, total] = await Promise.all([
            LiteryWorkBasePersistence.find(combinedFilter).skip(skip).limit(limit).populate('authors'),
            LiteryWorkBasePersistence.countDocuments(combinedFilter)
        ]);

        const results = literyWorks.map(work => this.toDomainEntity(work as LiteryWorkPersistence));

        return {
            results,
            total,
            page,
            limit
        };
    }
    private toDomainEntity(persistence: LiteryWorkPersistence): LiteryWorkEntity {
        const authors = (persistence.authors as IAuthor[]).map(author =>
            new AuthorEntity(author.authorId.toString(), author.name, author.email)
        );

        return (persistence.type === 'NOVEL' ?
            this.director.createNovel(
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
            this.director.createBook(
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

    private toPersisTenceEntity(domainEntity: LiteryWorkEntity): Omit<LiteryWorkPersistence, keyof Document> {       
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

}