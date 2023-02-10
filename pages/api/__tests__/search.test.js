import { createMocks } from 'node-mocks-http';
import handler from '../search/[searchTerm].ts';

describe('/api/search/[searchTerm]', () => {
    test('get request should return 200', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: 'rocket league' 
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(200)
    })
})