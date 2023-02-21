import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/Auth";
import { loggedIn } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify from "../../../Services/ErrorMessage";
import LoginWebApi from "../../../Services/LoginWebApi";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email pattern")
            .required("Email is required"),
        password: yup
            .string()
            .min(4, "password length minimum is 4 letters")
            .required("Password is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = {
            clientType: obj.clientType,
            email: obj.email,
            password: obj.password,
        };
        await LoginWebApi.login(credentials)
            .then((res) => {
                console.log(res.data.token)
                notify.success("login successfully");
                store.dispatch(loggedIn(res.data));

                if (obj.clientType === "ADMINISTRATOR") {
                    navigate("/home");
                }
                if (obj.clientType === "COMPANY") {
                    navigate("/home");
                }
                if (obj.clientType === "CUSTOMER") {
                    navigate("/home");
                }
            })
            .catch((err) => notify.error(err));
    };
    return (
        <div className="Login col">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(postLogin)} className="col">
                <select {...register("clientType")} placeholder="clientType" className="select">
                    <option value="default" disabled hidden>
                        Please choose user
                    </option>
                    <option value="ADMINISTRATOR">Administrator</option>
                    <option value="COMPANY">Company</option>
                    <option value="CUSTOMER">Customer</option>
                </select>
                {!errors.email ? (
                    <label htmlFor="email">Email</label>
                ) : (
                    <span>{errors.email.message}</span>
                )}
                <input
                    {...register("email")}
                    type="email"
                    placeholder="email"
                />
                {!errors.password ? (
                    <label htmlFor="password">Password</label>
                ) : (
                    <span>{errors.password.message}</span>
                )}
                <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                />
                <button disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
