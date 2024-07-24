
import { IliteryWorkRepository, IPaginationOptions, IQueryResult, LiteryWorkEntity } from '../../domain';
import { BookEntity, LiteryWorkDirector, NovelEntity } from '../../domain/entities';
import { LiteryWorkBasePersistence, NovelPersistence, BookPersistence } from '../schemas/literyworkPersistence';
import { LiteryWorkMapper } from '../mappers';


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
        return literywork ? LiteryWorkMapper.toDomainEntity(literywork, this.director) : null;
    }

    async findByKnowledgeArea(area: string, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { area: { $regex: area, $options: 'i' } };
        return this.executeQuery(filter, options);
    }

    async findByPublicationYear(year: number, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { publicationYear: { $regex: year, $options: 'i' } };
        return this.executeQuery(filter, options);
    }

    async findByTitle(title: string, options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
        const filter = { title: { $regex: title, $options: 'i' } };
        return this.executeQuery(filter, options);
    }
    async save(literyWork: LiteryWorkEntity): Promise<LiteryWorkEntity> {
        const persistenceEntity = LiteryWorkMapper.toPersisTenceEntity(literyWork);
        let savedEntity;
        if (literyWork instanceof NovelEntity) {
            savedEntity = await NovelPersistence.create(persistenceEntity);
        } else if (literyWork instanceof BookEntity) {
            savedEntity = await BookPersistence.create(persistenceEntity);
        } else {
            savedEntity = await LiteryWorkBasePersistence.create(persistenceEntity);
        }

        return LiteryWorkMapper.toDomainEntity(savedEntity, this.director);
    }

    async getAll(options: IPaginationOptions): Promise<IQueryResult<LiteryWorkEntity> | null> {
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

        const results = literyWorks.map(work => LiteryWorkMapper.toDomainEntity(work, this.director));

        return {
            results,
            total,
            page,
            limit
        };
    }
}