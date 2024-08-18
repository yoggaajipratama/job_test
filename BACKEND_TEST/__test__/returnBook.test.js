// __test__/getBook.test.js
const request = require('supertest');
const app = require('../app');

describe('POST /api/returnBook', () => {
    it('should return status and message', async () => {
        const response = await request(app)
            .post('/api/returnBook')
            .send({
                memberCode: 'M002',
                bookCode: 'JK-45'
            })
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('msg');
    });
});
