import { CardMedia, CardContent, Typography, CardActions, Button, Card } from "@mui/material";
import { Product } from "../../../../models/product";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/configureStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { user } = useAppSelector(state => state.account);
  const navigate = useNavigate();

  const openPdf = () => {
    if (user) {
      window.open(product.pdf, "_blank");
    } else {
      // Redirect to login page
      navigate("/login");
    }
  }

  return (
    <div>
      <Card style={{ textAlign: "center" }}>
        <Link to={`/catalogue/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            sx={{ height: 400, borderRadius: '0px'}}
            image={product.image}
            title={product.title} 
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.author} / {product.category}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            onClick={openPdf}
            sx={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "20px",
              width: "100%",
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}  
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
