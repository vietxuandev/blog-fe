import { getStrapiURL } from '@/lib/media';
import { FC } from 'react';

interface CkContentProps {
  content?: string;
}

export const CkContent: FC<CkContentProps> = ({ content }) => {
  if (!content) {
    return null;
  }
  return (
    <div
      className="ck-content"
      dangerouslySetInnerHTML={{
        __html: content.replaceAll('/uploads', getStrapiURL('/uploads')),
      }}
    />
  );
};
