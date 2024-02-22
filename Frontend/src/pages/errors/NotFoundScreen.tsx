import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container component={Paper} sx={{height: '35vh', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Typography gutterBottom variant="h3" sx={{padding: '60px', fontSize: '40px', textAlign: 'center'}}>
        Sorry we couldn't find what you were looking for.
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
    </Container>
  )
}

export default NotFound;