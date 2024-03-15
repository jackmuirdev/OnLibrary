import { Typography } from "@mui/material";
import BestSellersList from "../../components/layout/interface/dashboard-page/BestSellersList";
import Carousel from "../../components/layout/interface/dashboard-page/Carousel";

export default function DashboardScreen() {
  return (
    <div style={{ marginTop: "20px" }}>
      <Carousel />
      <div style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Typography variant="h4">
          Best Sellers
        </Typography>
        <BestSellersList />
      </div>
    </div>
  );
}
