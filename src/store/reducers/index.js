import { combineReducers } from "redux";
import car from "./car";
import user from "./user";
import app from "./app";
import settings from "./settings";
import tagsView from "./tagsView";
import monitor from "./monitor";

export default combineReducers({
  car,
  user,
  app,
  settings,
  tagsView,
  monitor
});
