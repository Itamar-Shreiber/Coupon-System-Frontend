import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerUpdateModel } from "../../../../Models/Model";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/AdminWebApi";
import * as yup from "yup";
import "./UpdateCustomer.css";
import notify from "../../../../Services/ErrorMessage";

function UpdateCustomer(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const [customer, setCustomer] = useState(
        store
            .getState()
            .adminReducer.customers.filter((cust) => cust.id === id)[0]
    );
    console.log(store.getState().adminReducer.customers);
    console.log(customer);
    const navigate = useNavigate();
    let defaultValuesObj = {
        ...{
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            password: customer.password,
        },
    };

    const updateCustomer = async (customer: CustomerUpdateModel) => {
        await adminWebApi
            .updateCustomer(id, customer)
            .then((res) => {
                notify.success("Customer updated");
                navigate("/getAllCustomers");
            })
            .catch((err) => {
                notify.error(err);
            });
        console.log(customer);
    };

    const schema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
    } = useForm<CustomerUpdateModel>({
        defaultValues: defaultValuesObj,
        mode: "all",
        resolver: yupResolver(schema),
    });

    // const { dirtyFields } = useFormState({
    //     control,
    // });
    return (
        <div className="UpdateCustomer col">
            <h1>Update Customer</h1>
            <form onSubmit={handleSubmit(updateCustomer)}>
                {errors.firstName ? (
                    <span>{errors.firstName?.message}</span>
                ) : (
                    <label htmlFor="firstName">First name </label>
                )}
                <input
                    {...register("firstName")}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name..."
                />{" "}
                {errors.lastName ? (
                    <span>{errors.lastName?.message}</span>
                ) : (
                    <label htmlFor="lastName">Last name </label>
                )}
                <input
                    {...register("lastName")}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name..."
                />
                {errors.email ? (
                    <span>{errors.email?.message}</span>
                ) : (
                    <label htmlFor="email">Email </label>
                )}
                <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email..."
                />
                {errors.password ? (
                    <span>{errors.password?.message}</span>
                ) : (
                    <label htmlFor="password">Password</label>
                )}
                <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Password..."
                />
                <button disabled={!isValid}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;