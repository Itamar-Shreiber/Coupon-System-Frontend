import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CompanyPayloadModel } from "../../../../Models/Model";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/ErrorMessage";

import "./AddCompany.css";

function AddCompany(): JSX.Element {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<CompanyPayloadModel>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const postCompany = async (company: CompanyPayloadModel) => {
        console.log(company);
        await adminWebApi
            .addCompany(company)
            .then((res) => {
                notify.success("Company added");
                navigate("/getAllCompanies");
            })
            .catch((err) => {
                notify.error(err);
            });
        console.log(company);
    };

    return (
        <div className="AddCompany col">
            <h1>Add Company</h1>
            <form onSubmit={handleSubmit(postCompany)}>
                {errors.name ? (
                    <span>{errors.name?.message}</span>
                ) : (
                    <label htmlFor="name">Name</label>
                )}
                <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="name..."
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
                <button disabled={!isValid}>Add Company</button>
            </form>
        </div>
    );
}

export default AddCompany;