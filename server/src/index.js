import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import workerPool from 'workerpool';
import {config} from "dotenv";
import {getBtcCurrent, getPriceInterval} from './api.js';
import {getDoc, postDoc} from './elastic.js';

const pool = workerPool.pool("./src/worker.js");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {}
});
config();

let counter=1;
io.on("connection", (socket) => {
    console.log(counter++);
    console.log("connected");
    socket.on("currency", (callback) => {
        getBtcCurrent().then((data) => callback(data)).catch(e => console.error(e));
    });
    socket.on("price_interval", (callback) => {
        getPriceInterval().then(data => callback(data)).catch(e => console.error(e));
    });
    socket.on("save_conversion", (value) => {
        pool.exec("insert", ["converter_history", value])
            .then(() => console.log(value)).catch((e) => console.error(e));
    });
    socket.on("getDoc", async (code, callback) => {
        console.log(await getDoc(code));
        callback(await getDoc(code));
    });
    socket.on("postDoc", (doc) => {
        postDoc(doc).then(res => console.log(res));
    });
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(8080, () => {
    console.log("listening on *:8080");
    pool.exec("dbInit").catch(err => console.error(err));
});

server.on("close", () => {
    pool.exec("dbClose").then(() => pool.terminate()).catch(e => console.error(e));
});

process.on("SIGTERM", () => server.close());
