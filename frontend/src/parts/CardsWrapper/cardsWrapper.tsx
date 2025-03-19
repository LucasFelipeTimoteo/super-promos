import * as React from 'react';
import { Box } from '@mui/material';
import ProductCard from '../ProductCard/productCard';
import { styles } from './cardWapper.style';
import CouponCard from '../CouponCard/couponCard';
import { Product } from '../../global/interfaces/products/products.type';
import { Coupon } from '../../global/interfaces/coupons/coupons.type';

interface CardsWrapperProps {
  data: Product[] | Coupon[];
  cardType: "products" | "coupons";
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({ data, cardType }) => {
  return (
    <Box sx={styles.charactersCardsSection}>
      <Box sx={styles.charactersCardsWrapper}>
        {cardType === "products" &&
          (data as Product[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        {cardType === "coupons" &&
          (data as Coupon[]).map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
      </Box>
    </Box>
  );
};

export default CardsWrapper;