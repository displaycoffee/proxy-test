// defining the server port
const port = 5000;

// initializing installed dependencies
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors());
app.use('/', createProxyMiddleware({ target: 'https://v5api.tiltify.com', changeOrigin: true }));

// listening for port 5000
app.listen(5000, () => console.log(`Server is running on ${port}`));
