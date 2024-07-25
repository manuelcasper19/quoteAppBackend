import { Schema, model, Document, Model   } from 'mongoose';

interface ILiteryWorkBase extends Document {
  title: string;
  authors: Schema.Types.ObjectId[];
  type: 'NOVEL' | 'BOOK';
  price: number;
  stock: number;
  url: string;
  status: 'DELETED' | 'AVAILABLE' | 'NOT_AVAILABLE';
  publicationYear: number;
}

const literyWorkPersistence = new Schema(
    {
        title: {
            type: String,
            unique: true,
            require: [ true, 'El titulo de la obra literaria es requerida']
        },
        authors: [
            {
                type: Schema.Types.ObjectId,       
                ref: 'Author',
                required: true
            }
        ],
        type : {
            type: String,   
            required : true,
            emun: ['NOVEL', 'BOOK']
        },
        price: {
            type: Number,  
            require: [ true, 'El precio de la obra literaria es requerido']
        },
        stock: {
            type: Number,  
            require: [ true, 'El stock de la obra literaria es requerido']
        },
        url: {
            type: String,          
            require: [ true, 'La url  de la obra literaria es requerida']
        },
        status : {
            type: String,   
             emun: ['DELETED', 'AVAILABLE', 'NOT_AVAILABLE']
        },
        publicationYear: {
            type: Number,
            require: [ true, 'El año de publicacion es necesario']
        }
  
    }
)

literyWorkPersistence.methods.toJSON = function() {
    const { _id, __v, ...literaryWork } = this.toObject();
    literaryWork.literyWorkId = _id;
    return literaryWork;
}

const LiteryWorkBasePersistence = model<ILiteryWorkBase>('LiteryWorkBase', literyWorkPersistence );

interface IBook extends ILiteryWorkBase {
  knowledgeAreas: string[];
  pages: number;
}

const bookSchema = new Schema({
    knowledgeAreas: [{
      type: String,
      required: true
    }],
    pages: {
      type: Number,
      required: true
    }
  });

  interface INovel extends ILiteryWorkBase {
    readingAge: number;
    genres: string[];
  }

  const novelSchema = new Schema({
    readingAge: {
      type: Number,
      required: true
    },
    genres: [{
      type: String,
      required: true
    }]
  })

  //modelo discriminaro
const BookPersistence = LiteryWorkBasePersistence.discriminator<IBook>('Book', bookSchema);
const NovelPersistence = LiteryWorkBasePersistence.discriminator<INovel>('Novel', novelSchema);

export { LiteryWorkBasePersistence, BookPersistence, NovelPersistence, ILiteryWorkBase, IBook, INovel };