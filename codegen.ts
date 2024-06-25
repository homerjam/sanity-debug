import * as dotenv from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config();

const config: CodegenConfig = {
	// schema: process.env.SANITY_GRAPHQL_URL,
	schema: 'http://localhost:5173/_api/graphql',
	generates: {
		'./src/lib/sanity/types/api.types.ts': {
			plugins: ['typescript'],
		},
	},
};

export default config;
