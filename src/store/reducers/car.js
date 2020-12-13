import * as types from "../action-types";
const carList = ['8888', '9999'];
export default function car(state = carList, action) {
  switch (action.type) {
    case types.CAR_SET_LIST:
      return {
        carList,
      };
    default:
      return {
        carList,
      };
  }
}

