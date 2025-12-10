import { APIRequestContext } from '@playwright/test';

type LoginPayload = { userEmail: string; userPassword: string };
type OrderPayload = { orders: { country: string; productOrderedId: string }[] };
type OrderResponse = { token: string; ordernumber: string };

export class ApiUtils {
  private apiContext: APIRequestContext;
  private loginPayload: LoginPayload;

  constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async gettoken(): Promise<string> {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      { data: this.loginPayload }
    );
    const jsonResponse = await loginResponse.json();
    const token = jsonResponse.token as string;
    return token;
  }

  async createOrder(orderPayload: OrderPayload): Promise<OrderResponse> {
    const response: OrderResponse = { token: '', ordernumber: '' };
    response.token = await this.gettoken();
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    response.ordernumber = orderResponseJson.orders[0] as string;
    return response;
  }
}
