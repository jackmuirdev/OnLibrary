import { Grid } from "@mui/material";
import ProductCard from "../catalog-page/ProductCard";
import { Product } from "../../../../models/product";

interface Props {
  products: Product[];
}

export default function BestSellers({ products }: Props) {
  return (
    <Grid container spacing={2}>
      {products.map((product: Product) => (
        <Grid item xs={3} sm={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
