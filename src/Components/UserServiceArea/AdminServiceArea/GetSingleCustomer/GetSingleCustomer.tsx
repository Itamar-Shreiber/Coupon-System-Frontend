import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomerModel } from "../../../../Models/Model";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/ErrorMessage";

import CustomerItem from "../../../Items/CustomerItem/CustomerItem";
import "./GetSingleCustomer.css";

type FormValues = {
    customerId: number;
};

function GetSingleCustomer(): JSX.Element {
    const [customers, setCustomers] = useState(
        store.getState().adminReducer.customers
    );

    const [outputValue, setOutputValue] = useState<number>(0);
    const { register, handleSubmit } = useForm<FormValues>();
    const [customerToShow, setCustomerToShow] = useState<CustomerModel[]>([]);

    const handleChange = async (data: FormValues) => {
        setOutputValue(data.customerId);
    };

    useEffect(() => {
        if (outputValue !== 0) {
            adminWebApi
                .getSingleCustomer(outputValue)
                .then((res) => {
                    setCustomerToShow([res.data]);
                    notify.success("customer found");
                })
                .catch((err) => {
                    setCustomerToShow([]);
                    notify.error(err);
                });
        }
    }, [outputValue]);
    return (
        <div className="GetSingleCustomer col">
            <h1>Find Customer</h1>
            <div>
                <form onSubmit={handleSubmit(handleChange)}>
                    <input {...register("customerId")} defaultValue={0} type="number" />
                    <button className="find" type="submit">
                        Find
                    </button>
                </form>
            </div>
            <div>
                {customerToShow.map((c, idx) => (
                    <CustomerItem key={"c" + idx} customer={c} />
                ))}
            </div>
        </div>
    );
}

export default GetSingleCustomer;
