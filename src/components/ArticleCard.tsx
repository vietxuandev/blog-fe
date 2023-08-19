import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';

import { FileFragment } from '@/generated/graphql';

import { NextImage } from '.';

interface ArticleCardDataProps {
  title: string;
  description: string;
  href: string;
  image?: FileFragment | null;
  publishedAt: string;
  isLoading?: undefined;
}

interface ArticleCardLoadingProps {
  title?: string;
  description?: string;
  href?: string;
  image?: FileFragment | null;
  publishedAt?: string;
  isLoading: true;
}

type ArticleCardProps = ArticleCardDataProps | ArticleCardLoadingProps;

export function ArticleCard({
  title,
  description,
  href,
  image,
  publishedAt,
  isLoading,
}: ArticleCardProps) {
  return (
    <Card variant="outlined">
      <CardActionArea
        {...(!isLoading && {
          component: Link,
          href,
        })}
      >
        <CardHeader
          title={
            isLoading ? (
              <>
                <Skeleton animation="wave" height={32} />
                <Skeleton animation="wave" height={32} width="80%" />
              </>
            ) : (
              title
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={24} width="40%" />
            ) : (
              dayjs(publishedAt).format('DD/MM/YYYY')
            )
          }
          titleTypographyProps={{
            sx: {
              height: '64px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            },
          }}
        />
        {isLoading ? (
          <Skeleton sx={{ pb: '75%' }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia sx={{ position: 'relative', pb: '75%' }}>
            <NextImage image={image} />
          </CardMedia>
        )}
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton animation="wave" height={20} />
              <Skeleton animation="wave" height={20} width="80%" />
            </>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                height: '40px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
