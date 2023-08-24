import mercadopago from 'mercadopago';
import {HOST, MERCADOPAGO_API_KEY} from '../config.js'

export const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: MERCADOPAGO_API_KEY,
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Laptop Lenovo",
                unit_price: 15000,
                currency_id: "CLP",
                quantity: 1,
            }
        ],

        back_urls: {
            success:'${HOST}/success',
            failure: '${HOST}/failure',
            pending:  '${HOST}/pending',
        notification_url: "https://7cf7-2803-c180-2100-7b39-3982-3cb1-c6d-f8be.ngrok.io/webhook",
    });

    console.log(result);
    res.send(result.body);
};

export const receiveWebhook = async (req, res) => {  // <-- Añade 'async'
    const payment = req.query;
    try {
        if (payment.type == "payment") {
            const data = await mercadopago.payment.findById(payment['data.id']);  // <-- Corrección aquí
            console.log(data);
            // store in database
        }

        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });  // <-- Corrección aquí (status, no sendStatus)
    }
};
