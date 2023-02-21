import { useNavigate, useParams } from "react-router-dom";
import "./DeleteCoupon.css";
import notify from "../../../../Services/ErrorMessage";
import companyWebApi from "../../../../Services/CompanyWebApi";

function DeleteCoupon(): JSX.Element {
    const navigate = useNavigate();

    const params = useParams();
    const couponId = +(params.id || 0);

    const cancel = () => {
        navigate("/companyCoupons");
    };
    const deleteCoupon = async () => {
        await companyWebApi
            .deleteCoupon(couponId)
            .then((res) => {
                notify.success("Coupon deleted");
                navigate("/companyCoupons");
            })
            .catch((err) => {
                notify.error(err);
            });
    };

    return (
        <div className="DeleteCoupon col">
            <h2 className="redColor">Delete Coupon number {couponId}</h2>
            <h2>Are you sure?</h2>
            <div className="row">
                <button onClick={cancel}>cancel</button>
                <button onClick={deleteCoupon}>delete</button>
            </div>
        </div>
    );
}

export default DeleteCoupon;
