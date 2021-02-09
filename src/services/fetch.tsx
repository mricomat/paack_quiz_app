import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";

import { mocks } from "src/assets";
import { log } from "src/utils/logger";

const mock = new MockAdapter(axios, { delayResponse: 1000 });

mock.onGet("/deliveries", { params: {} }).reply(200, mocks.deliveries);
mock.onGet("/delivery", { params: { id: 1234 } }).reply(200, mocks.delivery);
mock.onGet("/delivery", { params: { id: 4567 } }).reply(200, mocks.delivery);
mock.onPost("/traking").reply(200, mocks.traking);

export interface IRes<T> {
  status: number;
  data: T;
  error: boolean | string;
}

axios.defaults.baseURL = "";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

const checkResponse = async (response: Promise<{ response: AxiosResponse }>): Promise<IRes<any>> => {
  return response
    .then(res => res.response || res)
    .then(res => {
      const body = res;
      log(body);

      const { status } = body;
      const { errors } = body.data;

      if (errors) {
        // Handle errors
      }

      return { status, data: body.data, error: status !== 200 };
    })
    .catch(err => {
      log("err", err);
      return { status: 500, data: err, error: true };
    });
};

export const get = async (endPoint: string, params: any) => {
  return checkResponse(axios.get(endPoint, { params }).catch(e => e));
};
export const post = async (endPoint: string, body: any) => {
  return checkResponse(axios.post(endPoint, { body }).catch(e => e));
};
