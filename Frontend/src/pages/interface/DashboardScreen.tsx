import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "../../components/layout/interface/dashboard-page/Carousel";

export default function DashboardScreen() {
  return (
    <div style={{ marginTop: "10px" }}>
      <Carousel />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <Button variant="contained" style={{padding: "20px"}}>
          <Link to="/catalogue" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h4">Shop Now</Typography>
          </Link>
        </Button>
      </div>
    </div>
  );
}
