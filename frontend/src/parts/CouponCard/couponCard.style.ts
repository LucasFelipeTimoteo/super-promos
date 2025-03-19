import { SxProps } from '@mui/system';

const card: SxProps = {
  width: 270,
  height: 350,
  display: "flex",
  flexDirection: "column",
  cursor: 'pointer',
  position: 'relative',
};

const cardMedia: SxProps = {
  height: 150,
  objectFit: 'cover',
};

const cardContent: SxProps = {
  padding: 2,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
};

const title: SxProps = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  marginBottom: 2,
};

const code: SxProps = {
  color: 'text.primary',
  marginBottom: 0.5,
};

const codeHighlight: SxProps = {
  fontWeight: 'bold',
  letterSpacing: '0.01em', 
  textDecoration: "underline"
}

const discount: SxProps = {
  color: 'text.primary',
  marginBottom: 0.5,
  fontSize: '0.75rem',
};

const discountHighlight: SxProps = {
  fontSize: "1.1rem"
}

const copyText: SxProps = {
  color: 'blue',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  marginTop: 'auto',
};

const overlay: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(221, 221, 221, 0.96)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
};

const overlayText: SxProps = {
  color: 'white',
  textShadow: '0 0 2px black, 0 0 6px black',
};

export const styles = {
  card,
  cardMedia,
  cardContent,
  title,
  code,
  codeHighlight,
  discount,
  discountHighlight,
  copyText,
  overlay,
  overlayText,
};