import { CardMedia, CardContent, Typography, CardActions, Button, Card } from "@mui/material";
import { Product } from "../../../../models/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {

  const handleAddToCart = () => {
    // Dispatch the action to add the product to the cart
  };

  const openPdf = () => {
    window.open('../../../public/images/book-1984.png', "_blank");
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
            {product.author} / {product.category} {/* Use author and category from the data */}
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
            Open PDF
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}