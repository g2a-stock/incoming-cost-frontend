import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import {paths} from 'src/routes/paths';
import {useRouter} from 'src/routes/hooks';

import {useSnackbar} from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import {RoleBasedGuard} from "../../auth/guard";
import {createUser, updateUser} from "../../api/user";

// ----------------------------------------------------------------------

export default function UserNewEditForm({currentUser}) {
  const router = useRouter();

  const {enqueueSnackbar} = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    login: Yup.string().required('Name is required'),
    password: Yup.string().required('Name is required'),
    active: Yup.boolean().required(),
    percentage: Yup.number().required().min(1, 'Процент не может быть ниже 1').max(200, 'Процент не может быть больше 200'),
    // not required
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      login: currentUser?.login || '',
      password: currentUser?.passwordDecrypt || '',
      active: typeof currentUser?.active === "boolean" ? currentUser.active : true,
      percentage: currentUser?.percentage || '',
      description: currentUser?.description || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        await updateUser(data, currentUser._id)
      } else {
        await createUser(data)
      }

      enqueueSnackbar(currentUser ? 'Пользователь обновлен!' : 'Пользователь добавлен!');
      router.push(paths.dashboard.user.list);
      reset();
    } catch (error) {
      const errorMessage = error?.message &&  Array.isArray(error?.message) ? error?.message.join(', ') : error?.message || 'Произошла неизвестная ошибка!'
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  });

  return (
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Card sx={{p: 3}}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="login" label="Логин" disabled={currentUser ? true : false}/>
                <RHFTextField name="password" label="Пароль" disabled={currentUser ? true : false}/>
                <RHFTextField name="percentage" label="Процент"/>
                <RHFTextField name="description" label="Описание"/>
                <RHFSwitch name="active" label="Активен" />
              </Box>

              <Stack alignItems="flex-end" sx={{mt: 3}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Добавить пользователя' : 'Сохранить изменения'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
