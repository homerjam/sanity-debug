import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const sanityImageUrlBuilder = imageUrlBuilder({ dataset: 'production', projectId: 'j3t7ja61' });

export const sanityImageUrlFor = (image: SanityImageSource | null | undefined) => {
	if (!image) return undefined;
	try {
		return sanityImageUrlBuilder.image(image);
	} catch {
		return undefined;
	}
};
