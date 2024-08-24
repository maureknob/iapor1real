import React, { useState, useEffect } from 'react';
import { Payment, initMercadoPago } from '@mercadopago/sdk-react';

const CardPayment = () => {
  const [preferenceId, setPreferenceId] = useState('');

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
                // Handle the response from the backend
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
    </div>
  );
};

export default CardPayment;
