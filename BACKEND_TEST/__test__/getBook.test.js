// __test__/getBook.test.js
const request = require('supertest');
const app = require('../app');

describe('GET /api/books', () => {
    it('should return book list JSON', async () => {
        const response = await request(app).get('/api/books');
        expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBe(true)
        response.body.forEach(book => {
            expect(book).toEqual(
                {
                    book_author: expect.any(String),
                    book_code: expect.any(String),
                    book_id: expect.any(Number),
                    book_stock: expect.any(Number),
                    book_title: expect.any(String),
                }
            )
        });
    })
})
