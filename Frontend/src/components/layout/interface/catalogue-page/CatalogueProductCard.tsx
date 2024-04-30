import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CardMedia, Typography, CardContent, CardActions } from "@mui/material";
import { CardHeader, Card } from "react-bootstrap";
import { Product } from "../../../../models/product";
import { addBasketItemAsync } from "../../../../slices/basketSlice";
import { useAppSelector, useAppDispatch } from "../../../../store/configureStore";
import { currencyFormat } from "../../../../util/util";

interface Props {
  product: Product;
}

const StyledCardHeader = styled(CardHeader)`
  & .MuiCardHeader-content {
    flex: 1 1 auto;
    width: 100%;
  }
`;

const ProductCard = ({ product }: Props) => {
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
      <Card style={{ textAlign: "center" }}>
        <RouterLink to={`/catalog/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            sx={{ height: 400, borderRadius: '0px'}}
            image={product.image}
            title={product.title}
          />
        </RouterLink>
        <StyledCardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: -3,
                fontFamily: "'Questrial', sans-serif",
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.title}
            </Typography>
          }
        />
        <CardContent>
          <Typography gutterBottom color='primary' variant="h5" >
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.author} / {product.category}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
            size="small" 
            onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
            loading={status === 'pendingAddItem' + product.id} 
            sx={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "20px",
              width: "100%",
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}  
          >
            Add To Cart
          </LoadingButton>
        </CardActions>
      </Card>
  );
}

export default ProductCard;