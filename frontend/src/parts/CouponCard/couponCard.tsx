import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import couponImagebackground from '../../assets/coupon-card-backgroud.svg';
import { styles } from './couponCard.style';
import { Coupon } from '../../global/interfaces/coupons/coupons.type';
import { useCouponCard } from '../../hooks/card/useCouponCard';

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const { copied, handleCardClick } = useCouponCard(coupon);

  return (
    <Card sx={styles.card} onClick={handleCardClick}>
      {copied && (
        <Box sx={styles.overlay}>
          <Typography variant="h6" sx={styles.overlayText}>
            COPIADO!
          </Typography>
        </Box>
      )}
      <CardMedia
        component="img"
        alt={coupon.attributes.title}
        image={couponImagebackground}
        sx={styles.cardMedia}
      />
      <CardContent sx={styles.cardContent}>
        <Typography variant="h5" component="div" sx={styles.title}>
          {coupon.attributes.title}
        </Typography>

        <Typography variant="body2" sx={styles.code}>
          Código:
          <Typography variant="body2" sx={styles.codeHighlight} component="span">
            {' '}
            {coupon.attributes.code}
          </Typography>
        </Typography>

        <Typography variant="body2" sx={styles.discount}>
          Desconto:
          <Typography sx={styles.discountHighlight} variant="body2" component="span">
            {' '}
            {coupon.attributes.discount}%
          </Typography>
        </Typography>

        <Typography variant="body2" sx={styles.copyText}>
          CLIQUE PARA COPIAR CÓDIGO
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CouponCard;