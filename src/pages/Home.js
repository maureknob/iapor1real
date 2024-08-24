// src/components/Home.jsx
import React from 'react';
import { Box, Grid, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import logo from '../assets/logo.png';
import scientist from '../assets/iaporumreal.png';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleNavigateToPayment = () => {
        navigate('/payment');
      };

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 1 }}>
          <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover', // Ajusta a imagem para cobrir o Box
                '@media (max-width:600px)': {
                  height: '150px', // Reduz a altura da imagem em telas menores que 600px
                },
              }}
              alt="Example"
              src={logo}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 3, sm: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch', // Estica os botões para ocupar toda a largura
                height: '100%',
                gap: 2, // Espaçamento uniforme entre os botões
              }}
            >
              <Button variant="contained" color="primary" sx={{ width: '100%', height: '60px', borderRadius: '20px', backgroundColor: '#F4F100', color: '#372A28' }}
                onClick={handleNavigateToPayment}
              >
                Quero uma imagem
              </Button>
              <Button variant="contained" color="secondary" sx={{ width: '100%', height: '60px', borderRadius: '20px', backgroundColor: '#3D3C37' }}>
                Quero um texto
              </Button>
              <Button variant="contained" color="primary" sx={{ width: '100%', height: '60px', borderRadius: '20px', backgroundColor: '#38B6FF' }}>
                Quero um áudio
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 3 }}>
          <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover', // Ajusta a imagem para cobrir o Box
                '@media (max-width:600px)': {
                  height: '250px',
                  width: '100%'
                },
              }}
              alt="Example"
              src={scientist}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 4, sm: 4 }}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              alt="Example"
              src={logo}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
