import React from 'react';
import { useCart } from '../../contexts/cartProducts/hooks/useCart/useCart';
import CardsWrapper from '../../parts/CardsWrapper/cardsWrapper';
import { Box, Typography } from '@mui/material';
import { styles } from './cartPage.type';

const CartPage: React.FC = () => {
  const { cartProducts } = useCart();

  return (
    <Box sx={styles.cartPageContainer}>
      <Typography sx={styles.title} variant='h3' component="h1">Promoções salvas</Typography>
      <CardsWrapper data={cartProducts} cardType="products" />
    </Box>
  );
};

export default CartPage;