import { getStrapiURL } from '@/lib';

interface CkContentProps {
  content?: string;
}

export function CkContent({ content }: CkContentProps) {
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
}
