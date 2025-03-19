import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { styles } from './productCard.style';
import { Tooltip } from '@mui/material';
import GiftBackground from '../../assets/gift.svg';
import { Product } from '../../global/interfaces/products/products.type';
import { useProductCard } from '../../hooks/card/useProductCard';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    imageLoaded,
    setImageLoaded,
    handleCardClick,
    handleAddToCart,
    handleRemoveFromCart,
    isInCart,
  } = useProductCard(product);

  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        alt={product.attributes.title}
        image={imageLoaded ? product.attributes.image : GiftBackground}
        sx={styles.cardMedia}
        onClick={handleCardClick}
        onLoad={() => setImageLoaded(true)}
        style={{ filter: imageLoaded ? 'none' : 'blur(7px)', transition: 'filter 0.3s ease-out' }}
      />
      <CardContent sx={styles.cardContent}>
        <Tooltip title={product.attributes.title}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={styles.title}
            onClick={handleCardClick}
            className="title"
          >
            {product.attributes.title || 'Título indisponível'}
          </Typography>
        </Tooltip>
        <Typography variant="body2" sx={styles.seller}>
          vendido por: {product.attributes.seller}
        </Typography>
        {
          product.attributes.coupon && (
            <Typography variant="body2" sx={styles.coupon}>
              Cupon: <b>{product.attributes.coupon}</b>
            </Typography>

          )}
        {
          product.attributes.price_from && (
            <Typography variant="body2" sx={styles.priceFrom}>
              de: {product.attributes.price_from}
            </Typography>
          )
        }

        <Typography variant="body1" sx={styles.price} color='success' >
          por: {product.attributes.price}
        </Typography>
      </CardContent>
      <CardActions sx={styles.cardActions}>
        {isInCart ? (
          <Button startIcon={<RemoveShoppingCartIcon />} size="small" onClick={handleRemoveFromCart}>
            Remove from cart
          </Button>
        ) : (
          <Button startIcon={<AddShoppingCartIcon />} size="small" onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;