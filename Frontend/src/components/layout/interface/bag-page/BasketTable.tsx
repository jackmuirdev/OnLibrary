import { Remove, Add, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from '@mui/material';
import { BasketItem } from '../../../../models/basket';
import { removeBasketItemAsync, addBasketItemAsync } from '../../../../slices/basketSlice';
import { useAppDispatch } from '../../../../store/configureStore';

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
    const dispatch = useAppDispatch();

    const handleRemoveItem = (productId: number) => {
        dispatch(removeBasketItemAsync({ productId, quantity: 1 }));
      };
    
      const handleAddItem = (productId: number) => {
        dispatch(addBasketItemAsync({ productId, quantity: 1 }));
      };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isBasket &&
                            <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.image} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                {isBasket &&
                                    <Button
                                        onClick={() => handleRemoveItem(item.productId)}
                                        color='error'
                                    >
                                        <Remove />
                                    </Button>}
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton
                                        loading={false} // Set loading state here
                                        onClick={() => handleAddItem(item.productId)}
                                        color='secondary'
                                    >
                                        <Add />
                                    </LoadingButton>}
                            </TableCell>
                            <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={false} // Set loading state here
                                        onClick={() => handleRemoveItem(item.productId)}
                                        color='error'
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}