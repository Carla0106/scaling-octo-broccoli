import mercadopago from 'mercadopago'
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
      }
    })
    console.log(result)
    res.send('Crear Orden');
  };
  