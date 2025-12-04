    export class ApiUtils {       

        constructor(apiContext,loginPayload)
        {
            this.apiContext=apiContext;
            this.loginPayload=loginPayload;
            
        }

    async gettoken(){
        const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayload});          
         const jsaonresponse=  await loginResponse.json();//200,201
           const token =jsaonresponse.token;
           console.log(token);
           return token;
    }

    async createOrder(orderPayload){
      let response={};
      response.token= await this.gettoken();
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
      data:orderPayload,
      headers:{
         'Authorization':await this.gettoken(),
         'Content-Type':'application/json'
      }
   })
   const orderResponseJson= await orderResponse.json();
   console.log(orderResponseJson);
   response.ordernumber = orderResponseJson.orders[0];
   console.log(response.ordernumber);
   
   return response;


        }
      }module.exports={ApiUtils};
