import { useState } from 'react';
import { Coupon } from '../../global/interfaces/coupons/coupons.type';

export const useCouponCard = (coupon: Coupon) => {
  const [copied, setCopied] = useState(false);

  const handleCardClick = () => {
    navigator.clipboard.writeText(coupon.attributes.code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return {
    copied,
    handleCardClick,
  };
};