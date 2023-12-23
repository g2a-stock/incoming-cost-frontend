import useSWR, {mutate} from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export async function createUser(data) {
  try{
    const URL = endpoints.user.create;
    const response = await axios.post(URL, data);

    mutate(URL);

    return response.data
  } catch (e) {
    throw e
  }
}

export async function updateUser(data, userId) {
  try{
    const URL = endpoints.user.create + '/' + userId;
    const response = await axios.patch(URL, data);

    mutate(URL);

    return response.data
  } catch (e) {
    throw e
  }
}

export async function deleteUser(userId) {
  try{
    const URL = endpoints.user.details + '/' + userId;
    const response = await axios.delete(URL);

    return response.data
  } catch (e) {
    throw e
  }
}


export function useGetUsers() {
  const URL = endpoints.user.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(() => {
    return {
      users: data || [], // Список пользователей
      usersLoading: isLoading, // Загрузка идет, если нет данных и нет ошибки
      usersError: error, // Ошибка при запросе
      usersValidating: isValidating, // SWR выполняет повторную валидацию
      usersEmpty: !isLoading && !data?.length, // Пустой ли список пользователей
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetUser(userId) {
  const URL = userId ? `${endpoints.user.details}/${userId}` : '';
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(() => {
    return {
      user: data || null, // Список пользователей
      userLoading: isLoading, // Загрузка идет, если нет данных и нет ошибки
      userError: error, // Ошибка при запросе
      userValidating: isValidating, // SWR выполняет повторную валидацию
      userEmpty: !isLoading && !data, // Пустой ли список пользователей
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}
