import { GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_RESPONSE } from "../actions/products";

const initialState = {
  request: {
    status: "",
    errorText: "",
  },
  data: [],
};

export const productsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        request: {
          status: 'pending',
        },
      });
    case GET_PRODUCTS_RESPONSE:
      return Object.assign({}, state, {
        request: {
          status: 'success',
        },
        data: action.payload,
      });
    case GET_PRODUCTS_FAIL:
      return Object.assign({}, state, {
        request: {
          status: 'error',
          errorText: 'something went wrong',
        },
      });
    default:
      return state;
  }
};