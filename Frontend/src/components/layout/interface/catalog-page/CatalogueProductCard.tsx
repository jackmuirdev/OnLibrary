import { CardMedia, CardContent, Typography, CardActions, Button, Card } from "@mui/material";
import { useState, useEffect } from "react";
import booksData from "../../../../data/products.json";
import { Product } from "../../../../models/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(booksData);
  }, []);

  const handleAddToCart = () => {
    // Dispatch the action to add the product to the cart
  };

  const productDetails = products.find(item => item.id === product.id);

  if (!productDetails) return null;

  return (
    <div>
      <Card style={{ textAlign: "center" }}>
        <Link to={`/catalogue/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            sx={{ height: 400, borderRadius: '0px'}}
            image={productDetails.image}
            title={productDetails.title} 
          />
        </Link>
        <CardContent>
          <Typography gutterBottom color='primary' variant="h5" >
            {productDetails.price.toFixed(2)} {/* Use product price from the data */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {productDetails.author} / {productDetails.category} {/* Use author and category from the data */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            onClick={handleAddToCart}
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
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
