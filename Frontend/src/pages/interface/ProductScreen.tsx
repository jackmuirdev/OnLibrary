import {
  Grid,
  Typography,
  Divider,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Table,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import NotFound from "../errors/NotFoundScreen";
import { Product } from "../../models/product";

const ProductScreen = () => {
  const { id = "" } = useParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const [product, setProduct] = useState<Product | null>(null);
  const [productStatus, setProductStatus] = useState<"idle" | "pending" | "error" | "not-found">("pending");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://onlibrary.fly.dev/api/products/${productId}`);
        console.log("Response:", response);
        if (!response.ok) {
          if (response.status === 404) {
            setProductStatus("not-found");
          } else {
            throw new Error("Failed to fetch product");
          }
        } else {
          const data = await response.json();
          console.log("Fetched Product:", data);
          setProduct(data);
          setProductStatus("idle");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductStatus("error");
      }
    };

    fetchProduct();
  }, [productId]);

  if (productStatus === "pending") return <Loading />;
  if (productStatus === "not-found") return <NotFound />;
  if (productStatus === "error") return <div>Error fetching product</div>;
  if (!product) return null;

  const openPdf = () => {
    window.open(product.pdf, "_blank");
  }

  return (
    <Grid container spacing={15} sx={{ mt: 5 }}>
      <Grid item xs={12} md={6} sx={{ mb: 2 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3">{product.title}</Typography>
        <Divider sx={{ mb: 3, mt: 2 }} />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ width: "100%", marginTop: "-22px" }}>
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
                  <Button onClick={openPdf} variant="contained" size="large">
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProductScreen;
