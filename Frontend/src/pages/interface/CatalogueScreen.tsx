import { Grid, Pagination, Typography } from "@mui/material";
import ProductList from "../../components/layout/interface/catalogue-page/ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";

const ITEMS_PER_PAGE = 8;

const CatalogueScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [status, setStatus] = useState("idle");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("pending");
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setProductsLoaded(true);
        setStatus("idle");
      } catch (error) {
        console.error("Error fetching products:", error);
        setStatus("error");
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentProducts = products.slice(firstIndex, lastIndex);

  return (
    <>
      <Typography variant="h2" sx={{textAlign: "center", marginTop: "50px"}}>Catalogue</Typography>
      <Grid
        item
        xs={12}
        md={9}
        sx={{ marginTop: "50px", marginBottom: "20px" }}
      >
        {productsLoaded && status === "idle" ? (
          <ProductList products={currentProducts} />
        ) : status === "pending" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>Error fetching products</div>
        ) : null}
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "50px" }}>
        <Pagination
          count={Math.ceil(products.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </Grid>
    </>
  );
};

export default CatalogueScreen;
