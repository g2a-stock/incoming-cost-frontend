'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import {RoleBasedGuard} from "../../../auth/guard";
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();

  return (
    <RoleBasedGuard hasContent roles={['admin']} sx={{py: 10}}>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Добавить нового пользователя"
            links={[
              {
                name: 'Главная',
                href: paths.dashboard.root,
              },
              {
                name: 'Пользователи',
                href: paths.dashboard.user.list,
              },
              { name: 'Добавить пользователя' },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <UserNewEditForm />
      </Container>
    </RoleBasedGuard>
  );
}
