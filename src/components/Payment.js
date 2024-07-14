import React, { useEffect } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

const Payment = () => {
    useEffect(() => {
        // Initialize Mercado Pago
        initMercadoPago('TEST-98a651bd-e1e3-4653-a139-94f03cd9827f');
    }, []);

    const handlePayment = async () => {
        try {
            const response = await fetch.post('https://iapor1real-bdca07a7b858.herokuapp.com/payment/create-preference', {
                title: 'Produto Exemplo',
                price: 100,
                quantity: 1,
            });

            const preferenceId = response.data.id;
            const mp = new window.MercadoPago('TEST-98a651bd-e1e3-4653-a139-94f03cd9827f', {
                locale: 'pt-BR'
            });

            mp.checkout({
                preference: {
                    id: preferenceId
                },
                autoOpen: true
            });
        } catch (error) {
            console.error('Erro ao criar preferência', error);
        }
    };

    return (
        <div>
            <h1>Pagamento</h1>
            <button onClick={handlePayment}>Pagar com Mercado Pago</button>
            <div id="wallet_container"></div>
        </div>
    );
};

export default Payment;
