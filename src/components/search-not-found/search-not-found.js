import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SearchNotFound({ query, sx, ...other }) {
  return query ? (
    <Paper
      sx={{
        bgcolor: 'unset',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" gutterBottom>
        Ничего не найдено
      </Typography>

      <Typography variant="body2">
        Нет совпадений по запросу: &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> Пожалуйста, попробуйте изменить поиск.
      </Typography>
    </Paper>
  ) : (
    <Paper
      sx={{
        bgcolor: 'unset',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h7" sx={sx}>
        Пожалуйста, введите запрос
      </Typography>
    </Paper>
  );
}

SearchNotFound.propTypes = {
  query: PropTypes.string,
  sx: PropTypes.object,
};
