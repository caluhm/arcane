import { createMocks } from 'node-mocks-http';
import handler from '../post/index.ts';

describe('/api/post/index', () => {
    test('get request should return 200', async () => {
        const { req, res } = createMocks({
            method: 'GET',
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(200)
    })
})