const { app } = require('@azure/functions');

app.http('getGameStatus', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        // Parse query or request body
        let name = 'world';
        if (request.method === 'GET') {
            name = request.query?.name || 'world';
        } else if (request.method === 'POST') {
            try {
                const body = await request.json();
                name = body.name || 'world';
            } catch (error) {
                context.log('Failed to parse JSON:', error);
            }
        }

        // Return JSON response
        return {
            headers: { 'Content-Type': 'application/json' },
            body: { text: `Hello, ${name}!` },
        };
    }
});
