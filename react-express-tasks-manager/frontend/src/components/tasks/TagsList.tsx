import { Chip, Stack } from '@mui/material';

interface TagsListProps {
  tags: string[];
  size?: 'small' | 'medium';
  onDelete?: (index: number) => void;
}

const TagsList: React.FC<TagsListProps> = ({
  tags,
  size = 'small',
  onDelete,
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          size={size}
          variant="filled"
          color="primary"
          onDelete={onDelete ? () => onDelete(index) : undefined}
          sx={{
            backgroundColor: 'primary.light',
            color: 'primary.dark',
          }}
        />
      ))}
    </Stack>
  );
};

export default TagsList;
