import { Schema, model } from 'mongoose';

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

export default model('Author', authorPersistence );