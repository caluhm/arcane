import { createMocks } from 'node-mocks-http';
import handler from '../profile/[id].ts';

describe('/api/profile/[id]', () => {
    test('get request should return 200', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: ''
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(200)
    })
})