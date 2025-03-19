import { useState, useEffect } from 'react';
import axios from 'axios';
import { zodProductsValidator } from '../../global/validators/zod/products/productsValidator';
import { Product } from '../../global/interfaces/products/products.type';

export const useSearchProductsByCoupon = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSearchProductsByCoupon = async (searchedCoupon: string) => {
    const response = await axios.get(`http://localhost:3000/products?limit=10&start=0&coupon=${searchedCoupon}`);
    const products = response.data;

    const parsedProducts = zodProductsValidator.ProductsResponseSchema.safeParse(products);

    if (!parsedProducts.success) {
      throw new Error('Invalid product schema');
    }
    return parsedProducts.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoadingSearch(true);
      setIsError(false);

      try {
        const response = await fetchSearchProductsByCoupon(query);
        const data = response.data
        setSearchResults(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setIsError(true);
      } finally {
        setIsLoadingSearch(false);
      }
    };

    fetchData();
  }, [query]);

  return {
    query,
    setQuery,
    searchResults,
    isLoadingSearch,
    isError,
  };
};