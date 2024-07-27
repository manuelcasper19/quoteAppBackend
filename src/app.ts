import 'dotenv/config';
import Server from './infraestructure/server';

const server = new Server()

server.listen();