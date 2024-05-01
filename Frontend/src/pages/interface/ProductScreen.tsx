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
  const [productStatus, setProductStatus] = useState<string>("");

  const openPdf = () => {
    window.open('../../../public/images/book-1984.png', "_blank");
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setProductStatus("pending");
      try {
        const response = await fetch(
          `http://localhost:10000/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setProductStatus("idle");
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductStatus("error");
      }
    };

    fetchProduct();
  }, [productId]);

  if (productStatus === "not-found") return <NotFound />;

  if (productStatus.includes("pending")) return <Loading />;

  if (!product) return null;

  return (
    <Grid container spacing={15} sx={{ mt: 5 }}>
      <Grid item xs={6} sx={{ mb: 2 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.title}</Typography>
        <Divider sx={{ mb: 3, mt: 2 }} />
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
                  <Button onClick={openPdf}>
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
