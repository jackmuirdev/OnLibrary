import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "./CatalogueProductCard";
import ProductCardSkeleton from "./ProductSkeleton";
import { Product } from "../../../../models/product";

const ProductList = ({ products }: { products: Product[] }) => {
  const [productsLoaded, setProductsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setProductsLoaded(true); // Assuming products are loaded from props
  }, [products]);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={3} key={product.id}>
          {productsLoaded ? (
            <ProductCard product={product} />
          ) : (
            <ProductCardSkeleton />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
