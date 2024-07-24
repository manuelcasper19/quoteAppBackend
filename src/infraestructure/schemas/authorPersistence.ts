import { Schema, model } from 'mongoose';

export interface IAuthor extends Document {
    authorId: string;
    name: string;
    email: string;
  }

const authorPersistence = new Schema(
    {
        name: {
            type: String,
            unique: true,
            require: [ true, 'El nombre del autor es requerido']
        },
        email: {
            type: String,       
            require: [ true, 'El email del autor es requerido']
        }       
  
    }
)

authorPersistence.methods.toJSON = function() {
    const { _id, __v, ...literaryWork } = this.toObject();
    literaryWork.authorId = _id;
    return literaryWork;
}

export default model<IAuthor>('Author', authorPersistence );