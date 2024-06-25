import { sessionHooks, type Handler } from '@kinde-oss/kinde-auth-sveltekit';

export const handle: Handler = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
				},
			});
		}
	}

	sessionHooks({ event });

	const response = await resolve(event);

	return response;
};
