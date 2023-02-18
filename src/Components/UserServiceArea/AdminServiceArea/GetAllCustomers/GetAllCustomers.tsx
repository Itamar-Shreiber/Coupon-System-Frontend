import "./GetAllCustomers.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminWebApi from "../../../../Services/AdminWebApi";
import { CustomerModel } from "../../../../Models/Model";
import notify from "../../../../Services/ErrorMessage";
import CustomerItem from "../../../Items/CustomerItem/CustomerItem";
import store from "../../../../Redux/Store";
import { gotAllCustomersAction } from "../../../../Redux/AdminAppState";


function GetAllCustomers(): JSX.Element {
            const navigate = useNavigate();
            const addCustomer = () => {
                navigate("/addCustomer");
            };
            const getSingleCustomer = () => {
                navigate("/getSingleCustomer");
            };
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    useEffect(() => {
        adminWebApi
            .myCustomers()
            .then((res) => {
            store.dispatch(gotAllCustomersAction(res.data));
            setCustomers(res.data)
    })
    
            .catch((err) => notify.error(err));
    },[]);

    return (
        <div>
            <h1 className="GetAllCustomersH1">My customers</h1>
            <div className="NavigateCompany">
                <button className="Button" onClick={addCustomer}>
                    Add Customer
                </button>
                <button className="Button" onClick={getSingleCustomer}>Find Customer</button>
            </div>
            <div className="GetAllCustomers">
            {customers.map((c, idx) => (
                    <CustomerItem key={"c" + idx} customer={c} />
                ))}
            </div>
        </div>
    );
}
export default GetAllCustomers;