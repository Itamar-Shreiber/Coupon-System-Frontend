import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CustomerPayloadModel } from "../../../../Models/Model";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/ErrorMessage";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email pattern"),
        password: yup
            .string()
            .required("Password is required")
            .min(4, "password length minimum is 4 letters"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<CustomerPayloadModel>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const postCustomer = async (customer: CustomerPayloadModel) => {
        console.log(customer);
        await adminWebApi
            .addCustomer(customer)
            .then((res) => {
                notify.success("Customer added");
                navigate("/getAllCustomers");
            })
            .catch((err) => {
                notify.error(err);
            });
        console.log(customer);
    };

    return (
        <div className="AddCustomer col">
            <h1>Add Customer</h1>
            <form onSubmit={handleSubmit(postCustomer)}>
                {errors.firstName ? (
                    <span>{errors.firstName?.message}</span>
                ) : (
                    <label htmlFor="firstName">First name</label>
                )}
                <input
                    {...register("firstName")}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="firstName..."
                />
                {errors.lastName ? (
                    <span>{errors.lastName?.message}</span>
                ) : (
                    <label htmlFor="lastName">First name</label>
                )}
                <input
                    {...register("lastName")}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="lastName..."
                />

                {errors.email ? (
                    <span>{errors.email?.message}</span>
                ) : (
                    <label htmlFor="email">Email</label>
                )}
                <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
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
                <button disabled={!isValid}>Add Customer</button>
            </form>
        </div>
    );
}

export default AddCustomer;