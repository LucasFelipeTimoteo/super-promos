import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { zodCouponsValidator } from '../../global/validators/zod/coupons/couponsValidator';

const fetchCoupons = async ({ pageParam = 0 }) => {
  const queryLimit = 20;
  const response = await axios.get(`http://localhost:3000/coupons?limit=${queryLimit}&start=${pageParam}`);
  const coupons = response.data;

  const parsedCoupons = zodCouponsValidator.couponsResponseSchema.safeParse(coupons);

  if (!parsedCoupons.success) {
    throw new Error('Invalid coupon schema');
  }

  return {
    data: parsedCoupons.data.data,
    nextPage: pageParam + queryLimit,
    hasMore: parsedCoupons.data.data.length > 0,
  };
};

export const useCoupons = () => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['coupons'],
    queryFn: fetchCoupons,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    ref,
    data,
    error,
    isLoading,
    isFetchingNextPage,
  };
};