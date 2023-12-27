import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

// Определите максимальное количество результатов, которые вы хотите сохранить
const MAX_CACHE_SIZE = 10;

// Функция для настройки кэша
const setupCache = () => {
  const customCache = new Map();

  return {
    set: (key, value) => {
      customCache.set(key, value);

      // Ограничьте кэш до MAX_CACHE_SIZE
      if (customCache.size > MAX_CACHE_SIZE) {
        const oldestKey = customCache.keys().next().value;
        customCache.delete(oldestKey);
      }
    },
    get: (key) => customCache.get(key),
    delete: (key) => customCache.delete(key),
    keys: () => customCache.keys(),
  };
};

const customCache = setupCache();

export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    cache: customCache, // Указываем настроенный кэш
  });

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId) {
  const URL = productId ? `${endpoints.product.details}/${productId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(name, region, platform, activeOffers) {
  const URL = [endpoints.product.search, { params: { name, region, platform, activeOffers } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      // searchEmpty: !isLoading && !data?.results.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetSearchHistory() {
  const URL = endpoints.product.history;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      productsHistory: data?.productsHistory,
      productsHistoryLoading: isLoading,
      productsHistoryError: error,
      productsHistoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetProductIncome(productId) {
  const URL = productId ? `${endpoints.product.income}/${productId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      income: data?.income,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetProductsFilter() {
  const URL = endpoints.product.filter;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      productsFilter: data,
      productsFilterLoading: isLoading,
      productsFilterError: error,
      productsFilterValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getAllCachedProductKeys() {
  return Array.from(customCache.keys());
}
