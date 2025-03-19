import React, { useState, useEffect, ReactNode } from 'react';
import { Product } from '../../../global/interfaces/product/product.type';
import { CartContext } from '../context/cartContext';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product: Product) => {
    setCartProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};