import { Grid } from '@mui/material';
import BestSellers from './BestSellers';
import { useState, useEffect } from "react";
import booksData from "../../../../data/books.json";
import { Product } from "../../../../models/product";

const BestSellersList= () => {
  // Define the products state variable
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulating fetching data from the server
    setProducts(booksData);
  }, []);

  return (
    <Grid container columnSpacing={0} sx={{ width: '100%', maxWidth: 'initial' }}>
      <Grid item xs={12} md={12}>
        {/* Pass the products state variable to BestSellers component */}
        <BestSellers products={products} />
      </Grid>
    </Grid>
  );
};

export default BestSellersList;
