import { useState } from "react";
import { Grid, Pagination, Typography } from "@mui/material";
import ProductList from "../../components/layout/interface/catalog-page/ProductList";
import { Product } from "../../models/product";
import productsData from "../../data/products.json";

const ITEMS_PER_PAGE = 8;

const CatalogueScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const products: Product[] = productsData;
  const totalItems = products.length;

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Grid container spacing={4} style={{marginTop: "50px"}}>
      <Typography variant="h3">
        Catalogue
      </Typography>
      <Grid item xs={12}>
        <ProductList products={currentProducts} />
      </Grid>
      <Grid item xs={12} style={{marginBottom: "50px"}}>
        <Pagination
          count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </Grid>
    </Grid>
  );
};

export default CatalogueScreen;
