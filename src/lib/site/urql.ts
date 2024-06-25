import { Client, cacheExchange, fetchExchange } from '@urql/core';

export const createClient = ({ url, apiToken }: { url: string; apiToken?: string }) => {
	const client = new Client({
		url,
		exchanges: [cacheExchange, fetchExchange],
		fetchOptions: () => {
			const headers: Record<string, string> = {};

			if (apiToken) {
				headers['authorization'] = `Bearer ${apiToken}`;
			}

			return {
				headers,
			};
		},
	});

	return client;
};
