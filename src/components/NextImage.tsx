import Image from 'next/image';

import { FileFragment } from '@/generated/graphql';
import { getStrapiFile } from '@/lib';

interface ImageProps {
  image?: FileFragment | null;
}

export const NextImage = ({ image }: ImageProps) => {
  const src = getStrapiFile(image);
  return (
    <Image
      fill
      src={src}
      alt={image?.attributes?.alternativeText ?? ''}
      style={{
        objectFit: 'cover',
      }}
    />
  );
};
