export const GET_PRODUCTS_REQUEST = '@/GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_RESPONSE = '@/GET_PRODUCTS_RESPONSE';
export const GET_PRODUCTS_FAIL = '@/GET_PRODUCTS_FAIL';

export const getProductsRequestAction = (payload?: any) => ({ type: GET_PRODUCTS_REQUEST, payload });
export const getProductsResponseAction = (payload: any) => ({ type: GET_PRODUCTS_RESPONSE, payload });
export const getProductsFailAction = () => ({ type: GET_PRODUCTS_FAIL });