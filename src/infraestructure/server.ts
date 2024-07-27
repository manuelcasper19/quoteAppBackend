import express from 'express';
import cors from 'cors';
import { dbConnectionMongo } from './database/mongose';

class Sever {
   private app : express.Application;
   private port: string;
   private pathApi = {
    auth: '/api/auth',
    literyworks: '/api/literywork',
    loans: '/api/loan'
   }

   constructor() {

    this.app = express();

    this.port = process.env.PORT || '5002';   

    this.connectionDb();

    this.middlewares(); 
    
   }

   public listen(){
    this.app.listen( this.port, () => console.log('server running in the port ' + this.port))
   }

   private middlewares(){

      this.app.use( cors() );

      this.app.use( express.json() );
   }     
   
   private async connectionDb(){
      try {

         await dbConnectionMongo();

      } catch (error) {
         throw new Error('could not connect to DB '+ error as string)
      }
   }
  

}

export default Sever;