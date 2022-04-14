import { io } from 'socket.io-client';

export default io(
    `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    { reconnectionDelay: 5000, reconnectionDelayMax: 25000}
);
