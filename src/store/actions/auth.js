import { setUserToken, resetUser } from "./user";
import { getCarMes } from "./car";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken } from "@/utils/auth";



export const login = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin(params)
      .then((response) => {
        if (params.cmd === 'addCart') {
          getCarMes({uid: params.uid});
        }
        resolve(response.data) 
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((response) => {
        const { data } = response;
        if (data.status === 0) {
          dispatch(resetUser());
          removeToken();
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
