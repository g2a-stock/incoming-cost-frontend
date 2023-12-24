'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import {useGetUser} from "../../../api/user";
import {RoleBasedGuard} from "../../../auth/guard";
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView({ id: userId }) {
  const settings = useSettingsContext();
  const { user: currentUser, userLoading, userError } = useGetUser(userId);

  return (
    <RoleBasedGuard hasContent roles={['admin']} sx={{py: 10}}>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        {!userLoading && (
          <>
            <CustomBreadcrumbs
              heading="Редактировать пользователя"
              links={[
                {
                  name: 'Главная',
                  href: paths.dashboard.root,
                },
                {
                  name: 'Пользователи',
                  href: paths.dashboard.user.list,
                },
                { name: currentUser?.login },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />

            <UserNewEditForm currentUser={currentUser} />
          </>
        )}
      </Container>
    </RoleBasedGuard>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
