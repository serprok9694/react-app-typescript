import { call, put } from "@redux-saga/core/effects";
import { getProductsFailAction, getProductsResponseAction } from "../actions/products";
import { PRODUCTS_ENDPOINT } from "../constants/endpoints";
import { getRequest } from "../utils";


export function* productsSaga(action: any) {
  try {
    //@ts-ignore
    const response = yield call(getProducts, action.payload);
    yield put(getProductsResponseAction(response.data));
  } catch (error) {
    yield put(getProductsFailAction());
  }
};

async function getProducts(pageInfo: any) {
  const query = pageInfo ? `?page=${pageInfo?.pageIndex}&limit=${pageInfo?.pageSize}` : '';
  const response = await getRequest(`${PRODUCTS_ENDPOINT}${query}`);
  return response;
};