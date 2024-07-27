import { Schema, model } from 'mongoose';

export interface IAuthor extends Document {
    _id: Schema.Types.ObjectId;
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
        },               
  
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

authorPersistence.methods.toJSON = function() {
    const { _id, __v, ...author } = this.toObject();
    author.authorId = _id;
    return author;
}

export default model<IAuthor>('Author', authorPersistence );