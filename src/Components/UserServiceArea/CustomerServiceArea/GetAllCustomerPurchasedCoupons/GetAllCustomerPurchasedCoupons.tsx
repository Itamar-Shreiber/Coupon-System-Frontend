import { useState, useEffect } from "react";
import { CouponModel } from "../../../../Models/Model";
import customerWebApi from "../../../../Services/CustomerWebApi";
import notify from "../../../../Services/ErrorMessage";
import "./GetAllCustomerPurchasedCoupons.css";
import MyCouponsItem from "../../../Items/MyCouponsItem/MyCouponsItem";
import { gotAllCustomerPurchasedCouponsAction } from "../../../../Redux/CustomerAppState";
import store from "../../../../Redux/Store";

function GetAllCustomerPurchasedCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        customerWebApi
            .getCustomerPurchaseCoupons()
            .then((res) => {
                store.dispatch(gotAllCustomerPurchasedCouponsAction(res.data));
                setCoupons(res.data);
            })
            .catch((err) => notify.error(err));
    }, []);
    return (
        <div>
            <h1 className="GetAllCustomerPurchasedCouponsH1">My Coupons</h1>
            <div>
                {coupons.map((c, idx) => (
                    <MyCouponsItem key={"c" + idx} coupon={c} />
                ))}
            </div>
        </div>
    );
}

export default GetAllCustomerPurchasedCoupons;
