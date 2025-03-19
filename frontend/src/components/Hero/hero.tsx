import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './hero.style';
import { useHeroAnimation } from '../../hooks/hero/useHeroAnimation';

const Hero: React.FC = () => {
  const { animate, isCouponsPage } = useHeroAnimation();

  return (
    <Box sx={styles.heroContainer}>
      <Typography
        variant="h4"
        component="p"
        sx={{ ...styles.heroText, ...(animate && styles.heroTextAnimate) }}
      >
        {isCouponsPage ? 'Encontre os melhores cupons aqui!' : 'Encontre as melhores promoções aqui!'}
      </Typography>
    </Box>
  );
};

export default Hero;