import { createClient } from '@sanity/client';
import { SANITY_AUTH_TOKEN } from '$env/static/private';

// TODO: set sanity client use cdn + perspective

export const client = createClient({
	projectId: 'rp2u47wy',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2024-04-30',
	token: SANITY_AUTH_TOKEN,
});
