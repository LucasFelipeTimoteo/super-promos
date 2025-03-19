import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../global/interfaces/products/products.type';
import { zodProductsValidator } from '../../global/validators/zod/products/productsValidator';

const fetchSearchProducts = async (searchTerm: string) => {
  const response = await axios.get(`http://localhost:3000/products/${searchTerm}`);
  const products = response.data;

  const parsedProducts = zodProductsValidator.ProductsResponseSchema.safeParse(products);

  if (!parsedProducts.success) {
    throw new Error('Invalid product schema');
  }
  return parsedProducts.data;
};

export const useSearchProducts = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoadingSearch(true);
      setIsError(false);

      try {
        const response = await fetchSearchProducts(query);
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