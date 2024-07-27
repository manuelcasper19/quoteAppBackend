import { AuthorEntity, IAuthorRepository } from '../../domain';
import { AuthorMapper } from '../mappers';
import AuthorPersistence from '../schemas/authorPersistence';

export class AuthorRepositoryImpl implements IAuthorRepository {

    async createOrUpdateAuthor(author: AuthorEntity): Promise<AuthorEntity> {
        let authorResp;
        if (author.authorId) {

            authorResp = await AuthorPersistence.findByIdAndUpdate(author.authorId, author, { new: true });

            if (!authorResp) throw new Error(`No se pudo actualizar el author ${author.name}`);
        }
        else {
            const authorDb = new AuthorPersistence(author);

            authorResp = await authorDb.save();
        }
        return AuthorMapper.toDomainEntity(authorResp);
    }

    async findByIdAuthor(id: string): Promise<AuthorEntity | null> {

        return this.findAuthor({ _id: id });
    }
    async findByNameAuthor(name: string): Promise<AuthorEntity[] | null> {

        const authorDocs = await AuthorPersistence.find({ name: name });

        return authorDocs.map(authorDoc => AuthorMapper.toDomainEntity(authorDoc));
    }
    async getAllAuthor(): Promise<AuthorEntity[] | null> {

        const authorDocs = await AuthorPersistence.find({});

        return authorDocs.map(authorDoc => AuthorMapper.toDomainEntity(authorDoc));
    }
    private async findAuthor(filter: object): Promise<AuthorEntity | null> {
        const authorDoc = await AuthorPersistence.findOne(filter);
        if (!authorDoc) return null;
        return AuthorMapper.toDomainEntity(authorDoc);
    }

}