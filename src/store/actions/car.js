import * as types from "../action-types";
import { reqLogin } from "@/api/login";

export const getCarMes = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin(params)
      .then((response) => {
        console.log('response++++++++++++')
        console.log(response)
        dispatch(setCarMes([{
          key: '0000'
        }]))
        resolve(response.data) 
      })
      .catch((err) => {
        console.log(err)
        reject({error: '999'});
      });
  });
};

export const setCarMes = (token) => {
  return {
    type: types.CAR_SET_LIST,
    token,
  };
};
