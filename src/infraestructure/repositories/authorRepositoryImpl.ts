import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { AuthorEntity, IAuthorRepository } from '../../domain';
import { AuthorMapper } from '../mappers';
import AuthorPersistence from '../schemas/authorPersistence';

@injectable()
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
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            const authorDoc = await AuthorPersistence.findById(id);
            return authorDoc ? AuthorMapper.toDomainEntity(authorDoc) : null;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return null;
            }
            throw error;
        }
    }
    async findByNameAuthor(name: string): Promise<AuthorEntity[] | null> {
     
        const authorDocs = await AuthorPersistence.find({ name: { $regex: name, $options: 'i' } });
        console.log(authorDocs)
        return authorDocs.map(authorDoc => AuthorMapper.toDomainEntity(authorDoc));
    }
    async getAllAuthor(): Promise<AuthorEntity[] | null> {

        const authorDocs = await AuthorPersistence.find({});

        return authorDocs.map(authorDoc => AuthorMapper.toDomainEntity(authorDoc));
    }
}