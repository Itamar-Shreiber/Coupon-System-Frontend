import { useEffect } from "react";
import "./Logout.css";

import { loggedOut } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";

import store from "../../../Redux/Store";

import { removeCompanies, removeCustomers } from './../../../Redux/AdminAppState';
import { removeCoupons } from "../../../Redux/CompanyAppState";
import { removeCustomerCoupons } from "../../../Redux/CustomerAppState";


function Logout(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    store.dispatch(loggedOut());
    store.dispatch(removeCompanies());
    store.dispatch(removeCustomers());
    store.dispatch(removeCoupons());
    store.dispatch(removeCustomerCoupons());
    navigate("/home");
  }, []);
  return <></>;
}

export default Logout;
