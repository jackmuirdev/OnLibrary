import { Outlet } from 'react-router-dom';
import { Container, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import Loading from './components/common/Loading';
import Header from './components/common/Header';

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 800);

  if (loading) return <Loading />;

  return (
    <>
    <ToastContainer />
      <Header />
      <Container
        id="container"
      >
        <Outlet />
      </Container>
    </>
  )
}

export default App
