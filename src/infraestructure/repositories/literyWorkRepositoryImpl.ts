import { Model } from 'mongoose';
import { IliteryWorkRepository, IPaginationOptions, IQueryResult, LiteryWorkEntity } from '../../domain';
import { BookEntity, LiteryWorkDirector, NovelEntity } from '../../domain/entities';
import { LiteryWorkBasePersistence, NovelPersistence, BookPersistence, ILiteryWorkBase } from '../schemas/literyworkPersistence';
import { LiteryWorkMapper } from '../mappers';
import { inject, injectable } from 'inversify';
import { TYPESDI } from '../containers/types';


interface BaseFilter {
    status?: string;
}

@injectable()
export class LiteryWorkRepositoryImpl implements IliteryWorkRepository {

    constructor( @inject(TYPESDI.ILiteryWorkDirector) private director: LiteryWorkDirector) { }

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
    async createOrUpdate(literyWork: LiteryWorkEntity): Promise<LiteryWorkEntity> {
        const persistenceEntity = LiteryWorkMapper.toPersisTenceEntity(literyWork);
        let persistenceModel: Model<ILiteryWorkBase>;
    
        if (literyWork instanceof NovelEntity) {
            persistenceModel = NovelPersistence as unknown as Model<ILiteryWorkBase>;
        } else if (literyWork instanceof BookEntity) {
            persistenceModel = BookPersistence as unknown as Model<ILiteryWorkBase>;
        } else {
            persistenceModel = LiteryWorkBasePersistence;
        }   
        const savedEntity = await this.saveOrUpdate(persistenceModel, literyWork.literyWorkId, persistenceEntity);
    
        if (!savedEntity)  throw new Error(`Failed to save or update LiteryWork`);        
    
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
    private async saveOrUpdate<T extends ILiteryWorkBase>(model: Model<T>, id: string | undefined, entity: Partial<T>): Promise<T> {
        if (id) {
            const updatedEntity = await model.findByIdAndUpdate( id, entity, { new: true } );
            if (!updatedEntity) {
                throw new Error(`Failed to update entity with id ${id}`);
            }
            return updatedEntity;
        } else {
            const createdEntity = new model( entity );
            return await createdEntity.save();
        }
    }
}