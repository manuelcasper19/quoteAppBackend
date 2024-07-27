import 'dotenv/config';
import 'reflect-metadata';
import './infraestructure/http/controllers'
// Resto de tus importaciones...
import Server from './infraestructure/server';

const server = new Server()

server.listen();