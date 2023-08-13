import { AccessTime } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { FileFragment } from '@/generated/graphql';

import { Link, NextImage } from '.';

interface ArticleCardProps {
  title: string;
  description: string;
  href: string;
  image?: FileFragment | null;
  publishedAt: string;
}

export function ArticleCard({
  title,
  description,
  href,
  image,
  publishedAt,
}: ArticleCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} href={href}>
        <CardHeader
          title={title}
          subheader={
            <Box display="flex" alignItems="center">
              <AccessTime fontSize="small" sx={{ mr: 1 }} />
              {dayjs(publishedAt).format('DD/MM/YYYY')}
            </Box>
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
        <CardMedia component="div" sx={{ position: 'relative', pb: '75%' }}>
          <NextImage image={image} />
        </CardMedia>
        <CardContent>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
