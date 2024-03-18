import React from "react";
import { Grid } from "@mui/material";
import { Product } from "../../../../models/product";
import BestProductCard from "./BestProductCard";

interface ProductListProps {
  products: Product[];
}

const BestSellersList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <BestProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BestSellersList;