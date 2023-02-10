import { createMocks } from 'node-mocks-http';
import handler from '../discover/[topic]';

describe('/api/discover/[topic]', () => {
    test('get request should return 200', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                topic: 'Valorant'
            }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(200)
    })
})