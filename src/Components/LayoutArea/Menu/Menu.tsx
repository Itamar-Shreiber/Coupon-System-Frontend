import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState(store.getState().userReducer.user);
    useEffect(() => {
        return store.subscribe(() =>
            setUser(store.getState().userReducer.user)
        );
    }, []);

    return (
        <div className="Menu row">
            {user.clientType === "ADMINISTRATOR" && (
                <>
                    <CustomLink to={"getAllCompanies"}>Companies</CustomLink>
                    <CustomLink to={"getAllCustomers"}>Customers</CustomLink>
                </>
            )}

            {user.clientType === "COMPANY" && (
                <>
                    <CustomLink to={"companyCoupons"}>
                        Coupons
                    </CustomLink>
                </>
            )}

            {user.clientType === "CUSTOMER" && (
                <>
                    <CustomLink to={"purchase"}>Purchase</CustomLink>
                    <CustomLink to={"myCoupons"}>My coupons</CustomLink>
                </>
            )}

            {<CustomLink to={"about"}>About</CustomLink>}
            {<CustomLink to={"developer"}>Developer</CustomLink>}
        </div>
    );
}

export default Menu;
