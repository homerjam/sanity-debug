import { server, previewServer } from '$lib/api/graphql/server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (context) => {
	// TODO use previewServer if auth'd
	return server(context);
};

export const POST: RequestHandler = async (context) => {
	return server(context);
};

export const OPTIONS: RequestHandler = async (context) => {
	return server(context);
};
