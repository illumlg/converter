import dotenv from "dotenv";
import workerPool from "workerpool";
import express from "express";
import http from "http";
import {Server} from "socket.io";

dotenv.config();

const pool = workerPool.pool("./src/worker.js");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {}
});

export {pool, server, io};