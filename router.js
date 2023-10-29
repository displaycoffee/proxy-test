// import dependencies
import express from 'express';
import Client from './client.js';

// set new router
const router = express.Router();

let client = new Client();
// get router client
router.get('/*', function (request, response) {
	client.request(request.url).then((data) => {
		return response.send(data);
	});
});

export default router;
