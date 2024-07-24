import mongoose from 'mongoose';

export const dbConnectionMongo = async() => {
    const stringConnection = process.env.MONGODB!;
    try {

        await mongoose.connect( stringConnection );

        console.log('Database Mongo Online');
        
    } catch (error) {

        console.log(error);
        
        throw new Error(`Error connecting database mongo ${ error }`)
    }
}