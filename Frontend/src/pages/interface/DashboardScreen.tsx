import { Typography } from "@mui/material";
import BestSellersList from "../../components/layout/interface/dashboard-page/BestSellersList";
import Carousel from "../../components/layout/interface/dashboard-page/Carousel";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import bestSellersData from "../../data/bestSellers.json";

export default function DashboardScreen() {
  const bestSellers: Product[] = bestSellersData;

  return (
    <div style={{ marginTop: "20px" }}>
      <Carousel />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/catalogue"
          sx={{
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "20px",
            width: "25%",
            height: "100px",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          Shop Now
        </Button>
      </div>
      <div style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Typography variant="h4">Best Sellers</Typography>
        <BestSellersList products={bestSellers} />
      </div>
    </div>
  );
}
