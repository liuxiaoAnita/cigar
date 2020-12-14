import * as types from "../action-types";
import { reqLogin } from "@/api/login";

export const getCarMes = (params) => (dispatch) => {
  params = {cmd: 'cartList', ...params}
  return new Promise((resolve, reject) => {
    reqLogin(params)
      .then((response) => {
        if (response.data.result === '0') {
          const { body } = response.data
          dispatch(setCarMes({
            cartList: body,
          }));
          resolve(response.data) 
        }
        reject(response.data)
      })
      .catch((err) => {
        reject({err});
      });
  });
};

export const setCarMes = (data) => {
  return {
    type: types.CAR_SET_LIST,
    ...data,
  };
};
