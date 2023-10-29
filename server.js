// import dependencies
import cors from 'cors';
import express from 'express';
import router from './router.js';

// create express app and use cors and routes
const app = express();
app.use(cors());
app.use('/', router);

// define the server port
const port = 5000;

// listening for port 5000
app.listen(port, () => console.log(`Server is running on ${port}`));
