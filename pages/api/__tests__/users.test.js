import { createMocks } from 'node-mocks-http';
import handler from '../users.ts';

describe('/api/users', () => {
    test('get request should return 200', async () => {
        const { req, res } = createMocks({
            method: 'GET',
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(200)
    })
})