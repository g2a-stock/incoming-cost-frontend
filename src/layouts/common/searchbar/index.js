import { memo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { useEventListener } from 'src/hooks/use-event-listener';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';

import ResultItem from './result-item';
import { paths } from '../../../routes/paths';
import { applyFilter, getAllItems } from './utils';
import { useSearchProducts } from '../../../api/product';
import { useNavData } from '../../dashboard/config-navigation';

// ----------------------------------------------------------------------

function Searchbar() {
  const theme = useTheme();

  const router = useRouter();

  const search = useBoolean();

  const lgUp = useResponsive('up', 'lg');

  const [searchQuery, setSearchQuery] = useState('');

  const navData = useNavData();

  const { searchResults, searchLoading, searchError } = useSearchProducts(searchQuery);

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (id) => {
      router.push(paths.dashboard.product.details(id));
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: getAllItems({ data: navData }),
    query: searchQuery,
  });

  const notFound = searchQuery && !dataFiltered.length;

  const renderItems = () => {
    // Обработка состояния загрузки
    if (searchLoading) {
      return (
        <Paper
          sx={{
            bgcolor: 'unset',
            textAlign: 'center',
          }}
        >
          <Typography variant="h7">Загрузка...</Typography>
        </Paper>
      );
    }

    // Обработка состояния ошибки
    if (searchError) {
      return <Typography variant="body2">Ошибка: {searchError.message}</Typography>;
    }

    // Если нет данных
    if (!searchResults || searchResults.length === 0) {
      return <SearchNotFound query={searchQuery} sx={{ py: 10 }} />;
    }

    // Рендеринг результатов поиска
    return searchResults.map((item, index) => (
      <ResultItem
        key={index}
        title={item?.name} // Пример
        region={item?.region}
        platform={item?.platform}
        onClickItem={() => handleClick(item?.id)} // Пример
      />
    ));
  };

  const renderButton = (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={search.onTrue}>
        <Iconify icon="eva:search-fill" />
      </IconButton>

      {lgUp && (
        <Label sx={{ px: 0.75, fontSize: 12, color: 'text.secondary' }}>Найти продукт</Label>
      )}
    </Stack>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Поиск продукта..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </Box>

        <Scrollbar sx={{ p: 3, pt: 2, height: 400 }}>
          {/* {notFound ? <SearchNotFound query={searchQuery} sx={{ py: 10 }} /> : renderItems()} */}
          {renderItems()}
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
