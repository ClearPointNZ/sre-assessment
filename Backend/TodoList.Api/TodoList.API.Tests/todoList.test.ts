const request = require('supertest');
const moment = require('moment');
const baseUrl = 'http://localhost:3002/api';

describe('TodoItems GET endpoint', () => {
	let itemID = ''
	const data = {
			description: `Object ${moment().format(("DD-MM-YYYYTHH:MM:SS"))}`
			
	}
	test('POST should create a todo item', async () => {
		
		const response = await request(baseUrl)
			.post('/todoItems')
			.send(data)
			

		expect(response.statusCode).toBe(201);
		itemID = await response.body

	})
	test('GET should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('/todoItems')
			.set('Accept', 'application/json');	

		expect(response.statusCode).toBe(200);
		expect(response.headers['content-type']).toContain('application/json');


	});

	test('PUT should set the todo item to completed', async () => {
		const payload = {
				id: `${itemID}`,
				description: `${data.description}`,
				isCompleted: true
			}
		const response = await request(baseUrl)
			.put(`/todoItems/${itemID}`)
			.send(payload);
		expect(response.statusCode).toBe(204)
		
	});

	test('GET/itemID should get the completed item with isCompleted = true',async () => {
		
		const response = await request(baseUrl)
			.get('/todoItems/' + itemID)
		expect(response.statusCode).toBe(200)
		expect(response.body.id).toEqual(itemID)
		expect(response.body.description).toEqual(data.description)
		expect(response.body.isCompleted).toEqual(true)
		
	})

	
});
