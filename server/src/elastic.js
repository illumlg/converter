import {Client} from "@elastic/elasticsearch";

const client = new Client({
    node: `http://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
    // auth: {
    //     username: process.env.REACT_ELASTIC_USER,
    //     password: process.env.REACT_ELASTIC_PASSWORD
    // }
});
console.log("connected to elastic");
if (!await client.indices.exists({index: "currency"})) {
    await client.indices.create({
        index: "currency",
        mappings: {
            properties: {
                code: {type: "keyword"},
                rate: {type: "float"},
                date: {type: "date", format: "dd.MM.yyyy, HH:mm:ss"}
            }
        }
    });
    console.log(`successfully created "currency" index`);
}

/**
 * Retrieves documents from index "currency"
 * @returns {Promise<[]>}
 */
export async function getDoc() {
    try {
        let v = await client.search({
            index: "currency",
            query: {
                match_all: {}
            },
            size: 100,
            sort: {
                date: {
                    order: "desc"
                }
            }
        });
        return v.hits.hits.map(item => item._source);
    } catch (e) {
        console.error(e);
        return [];
    }
}

/**
 * Creates index "currency" if it does not exist and inserts document in it
 * @param doc
 * @returns {Promise<{}>}
 */
export async function postDoc(doc) {
    return await client.index({
        index: "currency",
        document: {
            ...doc
        }
    });
}
