import { SxProps } from "@mui/material";

const charactersCardsSection: SxProps = {
  display: 'grid',
  justifyItems: 'center',
  width: 'min(1326px, 100%)',
}
const charactersCardsWrapper: SxProps = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, 270px)`,
  justifyContent: 'center',
  gap: "25px",
  justifyItems: 'center',
}

export const styles = {
  charactersCardsSection,
  charactersCardsWrapper
}