import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ResultItem({ title, onClickItem, region, platform }) {
  return (
    <ListItemButton
      onClick={onClickItem}
      sx={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'transparent',
        borderBottomColor: (theme) => theme.palette.divider,
        '&:hover': {
          borderRadius: 1,
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        },
      }}
    >
      <ListItemText
        primaryTypographyProps={{
          typography: 'subtitle2',
          sx: { textTransform: 'capitalize' },
        }}
        secondaryTypographyProps={{ typography: 'caption' }}
        primary={
          <Box
            component="span"
            sx={{
              color: 'text.primary',
            }}
          >
            {title}
          </Box>
        }
      />
      <Stack direction="row" spacing={1} alignItems="center">
        {region && <Label color="primary">{region}</Label>}
        {platform && <Label color="info">{platform}</Label>}
      </Stack>
    </ListItemButton>
  );
}

ResultItem.propTypes = {
  onClickItem: PropTypes.func,
  title: PropTypes.string,
  region: PropTypes.string,
  platform: PropTypes.string,
};
