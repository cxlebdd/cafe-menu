import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';

const builder = imageUrlBuilder(client);

type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
  };
};

export const urlFor = (source: SanityImage): string => {
  return builder.image(source).url();
};
