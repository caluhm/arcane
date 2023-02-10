import { createMocks } from 'node-mocks-http';
import handler from '../post/[id].ts';

describe('/api/post/[id]', () => {
    test('get request should return 200', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                id: '1'
            }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(200)
    })
})