import { useState } from 'react';
import { useCart } from '../../contexts/cartProducts/hooks/useCart/useCart';
import { Product } from '../../global/interfaces/products/products.type';

export const useProductCard = (product: Product) => {
  const { cartProducts, addToCart, removeFromCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    window.open(product.attributes.link, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  const isInCart = cartProducts.some(cartProduct => cartProduct.id === product.id);

  return {
    imageLoaded,
    setImageLoaded,
    handleCardClick,
    handleAddToCart,
    handleRemoveFromCart,
    isInCart,
  };
};