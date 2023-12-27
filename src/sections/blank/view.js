'use client';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import Label from 'src/components/label';
import { TableHeadCustom } from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { RouterLink } from '../../routes/components';
import { fCurrency } from '../../utils/format-number';
import { useGetSearchHistory } from '../../api/product';
// ----------------------------------------------------------------------

export default function BlankView() {
  const settings = useSettingsContext();

  const { productsHistory, productsHistoryLoading } = useGetSearchHistory();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <CardHeader title="Последние 10 запросов" sx={{ mb: 3 }} />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHeadCustom
                headLabel={[
                  { label: 'Название' },
                  { label: 'Стоимость' },
                  { label: 'Платформа' },
                  { label: 'Регион' },
                  { label: '' },
                ]}
              />
              <TableBody>
                {productsHistory &&
                  productsHistory.slice(0, 10).map((historyItem, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          variant="rounded"
                          alt={historyItem.productRef.name}
                          src={historyItem.productRef.smallImage}
                          sx={{ mr: 2, width: 48, height: 48 }}
                        />
                        <Link
                          component={RouterLink} // Замените RouterLink на вашу компоненту ссылки
                          href={paths.dashboard.product.details(historyItem.productRef._id)} // Укажите ссылку на продукт
                          rel="noopener noreferrer"
                          underline="hover"
                        >
                          {historyItem.productRef.name}
                        </Link>
                      </TableCell>

                      <TableCell>
                        €{fCurrency(historyItem.income)} ~ ${fCurrency(historyItem.income * 1.1027)}
                      </TableCell>

                      <TableCell>
                        <Label variant="soft" color="info">
                          {historyItem.productRef.platform}
                        </Label>
                      </TableCell>

                      <TableCell>
                        <Label variant="soft" color="primary">
                          {historyItem.productRef.region}
                        </Label>
                      </TableCell>

                      <TableCell>
                        <Tooltip title="Открыть на G2A">
                          <IconButton
                            component={RouterLink}
                            href={`https://www.g2a.com${historyItem.productRef.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Iconify icon="eva:external-link-fill" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </Container>
  );
}
