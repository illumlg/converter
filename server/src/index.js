import {pool, server, io} from './config.js'
import {getBtcCurrent, getPriceInterval} from './api.js';
import {getDoc, postDoc} from './elastic.js';

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
    socket.on("getDoc", async (callback) => {
        let res = await getDoc();
        console.log(res);
        callback(res);
    });
    socket.on("postDoc", (doc, callback) => {
        postDoc(doc).then(res => {
            console.log(res);
            callback({"success": true});
        }).catch((e) => {
            console.error(e);
            callback({"success": false});
        });
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
