import {Client} from "@elastic/elasticsearch";

const client = new Client({
    node: `http://${process.env.APP_CONTAINER ? "elastic" : "localhost"}:9200`,
    // auth: {
    //     username: process.env.REACT_ELASTIC_USER,
    //     password: process.env.REACT_ELASTIC_PASSWORD
    // }
});
console.log("connected to elastic");

export async function getDoc() {
    try {
        let v = await client.search({
            index: "currency",
            query: {
                match_all: {}
            },
            size: 100
        });
        return v.hits.hits.map(item => Object.values(item._source)[0]).reverse();
    } catch (e) {
        console.log("index not found");
        return [];
    }
}

export function postDoc(doc) {
    return client.index({
        index: "currency",
        document: {
            ...doc
        }
    });
}

