import React, { useState, useEffect } from 'react';
import { Payment, initMercadoPago } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Card, Typography } from '@mui/material';

const CardPayment = () => {
  const [preferenceId, setPreferenceId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    initMercadoPago(process.env.REACT_APP_PAYMENT_KEY);

    fetch(process.env.REACT_APP_API_URL+"/payment/create-preference", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Product Example',
        quantity: 1,
        unit_price: 100.00,
        email: 'buyer@example.com',
        success_url: 'http://localhost:5000/success',
        failure_url: 'http://localhost:5000/failure',
        pending_url: 'http://localhost:5000/pending',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPreferenceId(data.id)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Container>
      <Grid
      container
      spacing={2}
      alignContent="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }} // Garante que o grid ocupe toda a altura da tela
    >
      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
            <h1>Mercado Pago Checkout</h1>
      {preferenceId ? (
        <Payment
          initialization={{
            amount: 1.00,
            preferenceId: preferenceId,
          }}
          customization={{
            paymentMethods: {
              creditCard: 'all',
              debitCard: 'all',
              ticket: 'all',
              bankTransfer: 'all',
              atm: 'all',
              onboarding_credits: 'all',
              wallet_purchase: 'all',
              maxInstallments: 1,
            },
          }}
          onSubmit={async ({selectedPaymentMethod, formData}) => {
            console.log(formData);
            // Handle the formData returned from the Brick
            fetch(process.env.REACT_APP_API_URL+'/payment/process-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then((response) => {
                if(response.status === "approved"){
                  navigate('/prompt');
                }
                console.log(response);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      </Grid>

      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      <Card
          sx={{
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
            Total
            $1
          </Typography>
        </Card>
      </Grid>
    </Grid>
      </Container>
    </div>
  );
};

export default CardPayment;
