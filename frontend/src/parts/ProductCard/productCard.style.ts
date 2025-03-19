import { SxProps } from "@mui/material";

const card: SxProps = {
  width: 270,
  height: 350,
  display: "flex",
  flexDirection: "column",
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.05)',
  },
};

const cardMedia: SxProps = {
  height: '50%',
  objectFit: 'scale-down',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const cardContent: SxProps = {
  padding: 2,
  paddingBottom: 0,
  textAlign: "center",
};

const title: SxProps = {
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};

const seller: SxProps = {
  color: 'text.primary',
  marginBottom: 0.5,
  fontSize: '0.75rem',
};

const coupon: SxProps = {
  color: 'text.primary',
  marginBottom: 0.5,
  fontSize: '0.75rem',
};

const priceFrom: SxProps = {
  color: 'text.secondary',
  textDecoration: 'line-through',
  fontSize: '0.75rem',
};

const price: SxProps = {
  fontSize: '0.75rem',
  fontWeight: "bold"
};

const cardActions: SxProps = {
  marginTop: "auto",
};

export const styles = {
  card,
  cardActions,
  cardContent,
  cardMedia,
  coupon,
  price,
  priceFrom,
  seller,
  title,
};