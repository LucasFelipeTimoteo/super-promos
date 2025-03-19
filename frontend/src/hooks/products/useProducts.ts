import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { zodProductsValidator } from '../../global/validators/zod/products/productsValidator';

const fetchProducts = async ({ pageParam = 0 }) => {
  const queryLimit = 20;
  const response = await axios.get(`http://localhost:3000/products?limit=${queryLimit}&start=${pageParam}`);
  const products = response.data;

  const parsedProducts = zodProductsValidator.ProductsResponseSchema.safeParse(products);

  if (!parsedProducts.success) {
    throw new Error('Invalid product schema');
  }

  return {
    data: parsedProducts.data.data,
    nextPage: pageParam + queryLimit,
    hasMore: parsedProducts.data.data.length > 0,
  };
};

export const useProducts = () => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
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