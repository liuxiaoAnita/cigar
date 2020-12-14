import * as types from "../action-types";
const cartList = {
  coupon_money: "0",
  dataList: [],
  old_money: "10",
  order_money: "0",
  sum_money: "0",
};
export default function car(state = cartList, action) {
  switch (action.type) {
    case types.CAR_SET_LIST:
      return {
        ...state,
        ...action.cartList,
      };
    default:
      return {
        ...state,
      };
  }
}

