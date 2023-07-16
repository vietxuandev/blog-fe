import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { stringAvatar } from '@/lib/string-avatar';
import dayjs from 'dayjs';

interface CommentListItemProps {
  name: string;
  content: string;
  createdAt: string;
}

export const CommentListItem = ({
  name,
  content,
  createdAt,
}: CommentListItemProps) => {
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
};
