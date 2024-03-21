import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const EmptyBasket = () => {
  return (
    <Container component={Paper} sx={{height: '35vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: 5}}>
      <Typography gutterBottom variant="h3" sx={{padding: '60px', fontSize: '40px', textAlign: 'center'}}>
        Your shopping bag is empty.
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to='/'>Go back to shop</Button>
    </Container>
  )
}

export default EmptyBasket