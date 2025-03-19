import { createContext } from 'react';
import { Product } from '../../../global/interfaces/product/product.type';

interface CartContextProps {
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);