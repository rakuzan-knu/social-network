import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userSearchApi } from '../api/userSearchApi';

const DEBOUNCE_MS = 300;

export function useUserSearch(rawQuery: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(rawQuery), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [rawQuery]);

  const trimmed = debouncedQuery.trim();

  const query = useQuery({
    queryKey: ['user-search', trimmed],
    queryFn: () => userSearchApi.search(trimmed),
    enabled: trimmed.length > 0,
    staleTime: 1000 * 30,
  });

  return {
    results: trimmed.length > 0 ? (query.data ?? []) : [],
    isSearching: trimmed.length > 0 && query.isFetching,
  };
}
