import { Grid, Button } from "@mui/material"; 
import { Link as RouterLink } from "react-router-dom";
import BagSummary from "../../components/layout/interface/bag-page/BagSummary";
import EmptyBasket from "../../components/layout/interface/bag-page/EmptyBasket";
import BasketTable from "../../components/layout/interface/bag-page/BasketTable";
import { useAppSelector } from "../../store/configureStore";
import { useEffect } from "react";

export default function BagScreen() {
  const { basket } = useAppSelector(state => state.basket);

  const fetchBasket = async () => {
    try {
      console.log("Fetching basket...");
      const response = await fetch("http://localhost:10000/api/basket", {
        method: 'GET',
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch basket");
      }
      const data = await response.json();
      console.log("Basket data:", data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (!basket) return <EmptyBasket />;

  return (
    <>
      <BasketTable 
        items={basket.items} 
      />
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
