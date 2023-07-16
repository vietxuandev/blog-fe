import { FileFragment } from '@/generated/graphql';
import { getStrapiFile } from '@/lib/media';
import Image from 'next/image';

interface ImageProps {
  image?: FileFragment;
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
