import { Box, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useProducts } from '../../hooks/products/useProducts';
import { useSearchProducts } from '../../hooks/products/useSearchProducts';
import CardsWrapper from "../../parts/CardsWrapper/cardsWrapper";
import Loading from '../../parts/Loading/loading';
import SearchBox from '../../parts/SearchBox/searchBox';
import { styles } from './productsPage.style';

const queryClient = new QueryClient();

const ProductsPage: React.FC = () => {
  const { ref, data, error, isLoading, isFetchingNextPage } = useProducts();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    setQuery,
    searchResults,
    isLoadingSearch,
  } = useSearchProducts();

  const handleSearch = () => {
    if (searchInputRef.current) {
      setQuery(searchInputRef.current.value);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return <div>Erro ao buscar produtos</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={styles.productsPageContainer}>

        {/* searchbox */}
        <SearchBox
          placeholder='Buscar produto'
          onSearch={handleSearch}
          inputRef={searchInputRef} />

        {/* Título */}
        <Typography sx={styles.title} variant="h3" component="h1">
          Produtos em promoção
        </Typography>

        {/* Erro de busca */}
        {query && searchResults.length === 0 && (
          <Typography sx={styles.title} variant="h5" component="p">
            Nenhum resultado encontrado
          </Typography>
        )}

        {/* resultados */}
        {isLoadingSearch ? (
          <Loading />
        ) : (
          <CardsWrapper
            data={query && searchResults.length > 0 ? searchResults : data?.pages.flatMap((page) => page.data) || []}
            cardType="products"
          />
        )}

        {/* intersection */}
        {(!query || (query && searchResults.length === 0)) && (
          <div ref={ref} style={{ ...styles.intersection }}>
            {isFetchingNextPage && <Loading />}
          </div>
        )}
      </Box>
    </QueryClientProvider>
  );
};

export default ProductsPage;