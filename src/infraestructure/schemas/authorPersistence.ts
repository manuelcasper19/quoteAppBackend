import { Schema, model } from 'mongoose';

export interface IAuthor extends Document {
    authorId: Schema.Types.ObjectId;
    name: string;
    email: string;
    active: boolean;
  }

const authorPersistence = new Schema(
    {
        name: {
            type: String,            
            require: [ true, 'El nombre del autor es requerido']
        },
        email: {
            type: String,  
            unique: true,     
            require: [ true, 'El email del autor es requerido']
        },
        active: {
            type: Boolean
        }       
  
    }
)

authorPersistence.methods.toJSON = function() {
    const { _id, __v, ...literaryWork } = this.toObject();
    literaryWork.authorId = _id;
    return literaryWork;
}

export default model<IAuthor>('Author', authorPersistence );