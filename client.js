import 'dotenv/config';
import fetch from 'node-fetch';

const tiltifyApi = 'https://v5api.tiltify.com';

class Client {
	constructor() {
		// Get oauth credentials from environment variables
		this.client_id = process.env.CLIENT_ID;
		this.client_secret = process.env.CLIENT_SECRET;
	}

	async getAccessToken() {
		const queryParams = new URLSearchParams({
			client_id: this.client_id,
			client_secret: this.client_secret,
			grant_type: 'client_credentials'
		})
		const url = `${tiltifyApi}/oauth/token?${queryParams}`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	}

	async request(path) {
		// Get initial token
		this.thing |= 'blah'
		this.token = this.token || (await this.getAccessToken()).access_token;

		// Fetch whatever path was requested
		const url = `${tiltifyApi}${path}`;
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		};
		let response = await fetch(url, requestOptions);

		// If unauthorized, get a new token and try again
		if (response.status == 401) {
			this.token = (await this.getAccessToken()).access_token;
			response = await fetch(url, requestOptions);
		}

		return await response.json();
	}
}

export default Client;
