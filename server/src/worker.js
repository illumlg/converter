import workerpool from 'workerpool';
import { insert, dbInit, dbClose } from './db.js';

workerpool.worker({
    dbInit,
    dbClose,
    insert
});
