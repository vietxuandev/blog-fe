import { FileFragment } from '@/generated/graphql';

export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`;
}

export function getStrapiFile(file?: FileFragment | null) {
  if (file?.attributes?.url) {
    const { url } = file.attributes;
    const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
    return imageUrl;
  }
  return '';
}
