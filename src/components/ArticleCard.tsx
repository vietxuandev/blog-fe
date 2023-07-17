import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Link from './Link';
import dayjs from 'dayjs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ArticleCardProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: string;
}

export function ArticleCard({
  title,
  description,
  slug,
  image,
  publishedAt,
}: ArticleCardProps) {
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={
          <Box display="flex" alignItems="center">
            <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
            {dayjs(publishedAt).subtract(1, 'year').format('DD/MM/YYYY')}
          </Box>
        }
      />
      <CardActionArea component={Link} href={`/article/${slug}`}>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
