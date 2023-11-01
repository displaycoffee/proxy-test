import express from 'express';
import Client from './client.js';

const router = express.Router();
const tiltifyClient = new Client();

router.get('/*', function (request, response) {
	tiltifyClient.request(request.url).then((data) => {
		return response.send(data);
	});
});

export default router;
