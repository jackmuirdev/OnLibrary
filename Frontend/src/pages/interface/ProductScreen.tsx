import { Grid, Typography, Divider, TableContainer, TableBody, TableRow, TableCell, IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import NotFound from "../errors/NotFoundScreen";
import { Remove, Add } from '@mui/icons-material';
import booksData from "../../data/products.json"; 
import bestData from "../../data/bestSellers.json"; 
import { Product } from "../../models/product";

export default function ProductScreen() {
  const { id = '' } = useParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const [product, setProduct] = useState<Product | null>(null);
  const [productStatus, setProductStatus] = useState<string>('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const selectedProduct = booksData.find((item) => item.id === productId) || bestData.find((item) => item.id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct(null);
      setProductStatus('not-found');
    }
  }, [productId]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleUpdateBasket = () => {
    // Define logic to update basket
  };

  if (productStatus === 'not-found') return <NotFound />;

  if (productStatus.includes("pending")) return <Loading />;

  if (!product) return null;

  return (
    <Grid container spacing={15} sx={{mt: 5}}>
      <Grid item xs={6} sx={{ mb: 2 }}>
        <img src={product.image} alt={product.title} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.title}</Typography>
        <Divider sx={{ mb: 3, mt: 2 }} />
        <Typography variant="h4" color='#1976d2'>£{product.price.toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ width: "100%" }}>
                    {product.description}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    {product.author} / {product.category}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    <IconButton color="error" onClick={handleDecrement}>
                      <Remove />
                    </IconButton>
                    {quantity}
                    <IconButton color="success" onClick={handleIncrement}>
                      <Add />
                    </IconButton>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ width: "35%" }}>
                    <Button variant="contained" onClick={handleUpdateBasket}>Add to Basket</Button>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
