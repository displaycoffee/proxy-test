import cors from 'cors';
import express from 'express';
import router from './router.js';

const app = express();
app.use(cors());
app.use('/', router);

const port = 5000;
app.listen(port, () => console.log(`Tiltify API Proxy server is running on ${port}`));
