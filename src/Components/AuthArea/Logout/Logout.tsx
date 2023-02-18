import { useEffect } from "react";
import "./Logout.css";

import { loggedOut } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";

import store from "../../../Redux/Store";

import { removeCompanies, removeCustomers } from './../../../Redux/AdminAppState';
import { removeCompanyCoupons } from "../../../Redux/CompanyAppState";
import { removeCustomerCoupons } from "../../../Redux/CustomerAppState";


function Logout(): JSX.Element {
  const navigate = useNavigate();
  const userType = store.getState().userReducer.user.clientType;
    useEffect(() => {
        store.dispatch(loggedOut());
        if (userType == "ADMINISTRATOR") {
            store.dispatch(removeCompanies());
            store.dispatch(removeCustomers());
        }
        if (userType == "COMPANY") {
            store.dispatch(removeCompanyCoupons());
        }
        if (userType == "CUSTOMER") {
            store.dispatch(removeCustomerCoupons());
        }
    navigate("/home");
  }, []);
  return <></>;
}

export default Logout;
