// import dependencies
import 'dotenv/config';
import fetch from 'node-fetch';

// set static variables
const tiltifyApi = 'https://v5api.tiltify.com';

class Client {
	constructor() {
		// get id and secret from env
		this.client_id = process.env.CLIENT_ID;
		this.client_secret = process.env.CLIENT_SECRET;
	}

	async getAccessToken() {
		// set fetch variables
		const parameters = `?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`;
		const url = `${tiltifyApi}/oauth/token${parameters}`;

		// await response and return json for token
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		return json;
	}

	async request(path) {
		console.log('-------------------------------');
		// get oauth token data
		if (!this.token) {
			const data = await this.getAccessToken();
			this.token = data.access_token;
			console.log('token data', data);
			console.log('-------------------------------');
		}

		// set fetch variables
		const url = `${tiltifyApi}${path}`;

		// await response and return json
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
		console.log('response', response);
		console.log('-------------------------------');
		const json = await response.json();
		console.log('json', json);
		console.log('-------------------------------');
		return json;
	}
}

export default Client;
