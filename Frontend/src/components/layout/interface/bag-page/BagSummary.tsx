import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { Product } from '../../../../models/product';

interface Props {
    products?: Product[];
}

export default function BasketSummary({ products }: Props) {
    // Calculate subtotal based on the products
    const subtotal = products ? products.reduce((acc, curr) => acc + curr.price, 0) : 0;

    // Define delivery fee
    const deliveryFee = 5;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{(subtotal + deliveryFee).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
