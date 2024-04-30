import { Grid, Button } from "@mui/material"; 
import { Link as RouterLink } from "react-router-dom";
import BagSummary from "../../components/layout/interface/bag-page/BagSummary";
import EmptyBasket from "../../components/layout/interface/bag-page/EmptyBasket";
import BasketTable from "../../components/layout/interface/bag-page/BasketTable";
import { useAppSelector } from "../../store/configureStore";

export default function BagScreen() {
  const { basket } = useAppSelector(state => state.basket);

  if (!basket) return <EmptyBasket />;

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BagSummary />
          <Button component={RouterLink} to="/checkout" variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
