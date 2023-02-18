import { combineReducers, createStore } from "redux";
import { adminReducer } from "./AdminAppState";
import { companyReducer } from "./CompanyAppState";

import { customerReducer } from "./CustomerAppState";
import { userReducer } from "./UserAppState";

// Multiple catsReducer
const reducers = combineReducers({
  userReducer: userReducer,
  companyReducer: companyReducer,
  adminReducer: adminReducer,
  customerReducer: customerReducer,
});

const store = createStore(reducers);

export default store;
