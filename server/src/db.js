import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host: process.env.APP_CONTAINER ? "db" : "localhost",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

export function createTable(tableName) {
    client.query(`CREATE TABLE IF NOT EXISTS ${tableName}
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
        input_value real NOT NULL,
        input_currency character varying COLLATE pg_catalog."default" NOT NULL,
        result_value real NOT NULL,
        result_currency character varying COLLATE pg_catalog."default" NOT NULL,
        bitcoin_rate real NOT NULL,
        date character varying COLLATE pg_catalog."default",
        CONSTRAINT converter_history_pkey PRIMARY KEY (id)
    )`, (err) => {
        if(err)
            throw err;
        console.log("check table existence successful");
    });
}

export function insert(tableName, entity) {
    let params = [];
    for (let i = 0; i < Object.values(entity).length; i++) {
        params.push(`$${i+1}`);
    }
    client.query(`INSERT INTO ${tableName} (${Object.keys(entity).join()}) VALUES(${Object.values(params).join()});`, Object.values(entity), err => {
        if(err)
            throw err;
        console.log("insert successful");
    });
}

export function dbInit() {
    client.connect();
    console.log("connected to db");
    createTable("converter_history");
}

export function dbClose() {
    client.end();
    console.log("db closed");
}
