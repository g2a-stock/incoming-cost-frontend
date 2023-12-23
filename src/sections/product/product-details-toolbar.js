import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ProductDetailsToolbar({ backLink, slug }) {
  const popover = usePopover();

  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {/* <Button */}
      {/*  component={RouterLink} */}
      {/*  href={backLink} */}
      {/*  startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />} */}
      {/* > */}
      {/*  Назад */}
      {/* </Button> */}

      <Box sx={{ flexGrow: 1 }} />

      {slug && (
        <Tooltip title="Открыть на G2A">
          <IconButton
            component={RouterLink}
            href={`https://www.g2a.com${slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Iconify icon="eva:external-link-fill" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

ProductDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  slug: PropTypes.string,
};
