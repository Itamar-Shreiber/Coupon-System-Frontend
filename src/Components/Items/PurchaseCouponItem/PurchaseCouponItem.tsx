import { BsCashCoin } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import "./PurchaseCouponItem.css";
import { CouponModel } from "../../../Models/Model";
import customerWebApi from "../../../Services/CustomerWebApi";
import notify from "../../../Services/ErrorMessage";
import { useState } from "react";
import store from "./../../../Redux/Store";

interface PurchaseCouponItemProps {
    coupon: CouponModel;
}

function PurchaseCouponItem(props: PurchaseCouponItemProps): JSX.Element {
    const [user, setUser] = useState(store.getState().userReducer.user);
    const navigate = useNavigate();
    const params = useParams();
    const couponId = +(params.id || 0);

    const addCouponToCustomer = async () => {
        await customerWebApi
            .purchaseCoupon(props.coupon.id)
            .then((res) => {
                notify.success("coupon purchased");
                navigate("/myCoupons");
            })
            .catch((arr) => {
                notify.error(arr);
            });
    };

    return (
        <div className="card">
            <img src={props.coupon.image} alt="Coupon" />
            <h1>{props.coupon.title}</h1>
            <p className="price">Price: ${props.coupon.price}</p>
            <span>Company: {props.coupon.company.name}</span>
            <hr />
            <span>{props.coupon.category}</span>
            <hr />
            <span>{props.coupon.description}</span>
            <hr />
            <span>Start: {props.coupon.startDate.toString()}</span>
            <hr />
            <span>End: {props.coupon.endDate.toString()}</span>
            <hr />
            <span
                className={
                    props.coupon.amount > 5
                        ? "good"
                        : props.coupon.amount == 5
                        ? "avg"
                        : "bad"
                }
            >
                {props.coupon.amount}
            </span>
            <div className="divButton">
                <button className="PurchaseB" onClick={addCouponToCustomer}>
                    Purchase now &nbsp;
                    <BsCashCoin size={24} />
                </button>
            </div>
        </div>
    );
}

export default PurchaseCouponItem;
