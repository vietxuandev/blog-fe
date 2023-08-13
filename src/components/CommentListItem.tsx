import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { stringAvatar } from '@/lib';

interface CommentListItemProps {
  name: string;
  content: string;
  createdAt: string;
}

export function CommentListItem({
  name,
  content,
  createdAt,
}: CommentListItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar {...stringAvatar(name)} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            {name}
            {' - '}
            <Typography component="span" color="text.secondary">
              {dayjs(createdAt).format('DD/MM/YYYY')}
            </Typography>
          </>
        }
        secondary={content}
        secondaryTypographyProps={{
          whiteSpace: 'pre-line',
        }}
      />
    </ListItem>
  );
}
