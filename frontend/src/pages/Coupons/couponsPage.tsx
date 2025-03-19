import { Box, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useCoupons } from '../../hooks/coupons/useCoupons';
import { useSearchProductsByCoupon } from '../../hooks/products/useSeachProductsByCoupon';
import CardsWrapper from "../../parts/CardsWrapper/cardsWrapper";
import Loading from '../../parts/Loading/loading';
import SearchBox from '../../parts/SearchBox/searchBox';
import { styles } from './couponsPage.style';

const queryClient = new QueryClient();

const CouponsPage: React.FC = () => {
  const { ref, data, error, isLoading, isFetchingNextPage } = useCoupons();
  const {
    query,
    setQuery,
    searchResults,
    isLoadingSearch,
    isError,
  } = useSearchProductsByCoupon();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchInputRef.current) {
      setQuery(searchInputRef.current.value);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error('Erro ao buscar cupons:', error);
    return <div>Erro ao buscar cupons</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={styles.couponsPageContainer}>
        {/* SearchBox */}
        <SearchBox
          placeholder='Buscar produtos por cupom'
          onSearch={handleSearch}
          inputRef={searchInputRef} />

        {/* Título */}
        <Typography sx={styles.title} variant="h3" component="h1">
          {query && searchResults.length > 0 ? 'Produtos com o cupom' : 'Cupons de desconto'}
        </Typography>

        {/* Nenhum resultado encontrado */}
        {query && searchResults.length === 0 && (
          <Typography sx={styles.title} variant="h5" component="p">
            Nenhum resultado encontrado
          </Typography>
        )}

        {/* Resultados */}
        {isLoadingSearch ? (
          <Loading />
        ) : isError ? (
          <Typography color="error">Erro ao buscar produtos.</Typography>
        ) : (
          <CardsWrapper
            data={query && searchResults.length > 0 ? searchResults : data?.pages.flatMap((page) => page.data) || []}
            cardType={query && searchResults.length > 0 ? 'products' : 'coupons'}
          />
        )}

        {/* Intersection */}
        {(!query || (query && searchResults.length === 0)) && (
          <div ref={ref} style={{ ...styles.intersection }}>
            {isFetchingNextPage && <Loading />}
          </div>
        )}
      </Box>
    </QueryClientProvider>
  );
};

export default CouponsPage;