import { Grid } from "@mui/material"
import { Product } from "../../../../models/product";
import { useAppSelector } from "../../../../store/configureStore";
import ProductCard from "./CatalogueProductCard";
import ProductCardSkeleton from "./ProductSkeleton";

interface Props {
  products:Product[];
}

const ProductList = ({products}: Props) => {
  const {productsLoaded} = useAppSelector(state => state.catalog);

  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={6} sm={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList