import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { stringAvatar } from '@/lib';

interface CommentListItemDataProps {
  name: string;
  content: string;
  createdAt: string;
  isLoading?: undefined;
}

interface CommentListItemLoadingProps {
  name?: string;
  content?: string;
  createdAt?: string;
  isLoading: true;
}

type CommentListItemProps =
  | CommentListItemDataProps
  | CommentListItemLoadingProps;

export function CommentListItem({
  name,
  content,
  createdAt,
  isLoading,
}: CommentListItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        ) : (
          <Avatar {...(!isLoading && stringAvatar(name))} />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          isLoading ? (
            <Skeleton animation="wave" height={20} width="60%" />
          ) : (
            <>
              {name}
              {' - '}
              <Typography component="span" color="text.secondary">
                {dayjs(createdAt).format('DD/MM/YYYY')}
              </Typography>
            </>
          )
        }
        secondary={
          isLoading ? (
            <>
              <Skeleton animation="wave" height={20} />
              <Skeleton animation="wave" height={20} width="40%" />
            </>
          ) : (
            content
          )
        }
        secondaryTypographyProps={{
          whiteSpace: 'pre-line',
        }}
      />
    </ListItem>
  );
}
