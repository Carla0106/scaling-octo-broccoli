import mercadopago from 'mercadopago';
export const createOrder = async (req, res) => {
    mercadopago.configure({
      access_token: 
          "TEST-3043536505149344-081014-e49dcbe705fbd33591992ad5706af328-1447718584",
    });
      
    const result = await mercadopago.preferences.create({
      items:[
          {
              title:"Laptop Lenovo",
              unit_price: 15000,
              currency_id: "CLP",
              quantity: 1,
          }
      ],

      back_urls: {
        success:"http://localhost:3000/success",
        failure:"http://localhost:3000/failure",
        pending:"http://localhost:3000/pending",
      },
      notification_url:"https://7d3e-2803-c180-2100-7b39-9045-4572-dd59-d674.ngrok.io/webhook",
    });
    console.log(result);
    res.send(result.body);
  };
  export const receiveWebhook = (req, res ) => {
    console.log(req.query);

    res.send("webhook");
  }
  