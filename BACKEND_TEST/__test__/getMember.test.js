// __test__/getBook.test.js
const request = require('supertest');
const app = require('../app');

describe('GET /api/members', () => {
    it('should return member list JSON', async () => {
        const response = await request(app).get('/api/members');
        expect(response.statusCode).toBe(200);
        response.body.forEach(member => {
            expect(member).toHaveProperty('member_id');
            expect(member).toHaveProperty('member_name');
            expect(member).toHaveProperty('member_code');
            expect(member).toHaveProperty('member_penalty');
            expect(member).toHaveProperty('total_borrow');
        });
    });
});
