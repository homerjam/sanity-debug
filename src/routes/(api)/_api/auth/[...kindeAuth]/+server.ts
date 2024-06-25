import { handleAuth } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	return handleAuth(event);
};
