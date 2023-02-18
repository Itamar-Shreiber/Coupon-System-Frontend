import { CouponModel } from "../../../Models/Model";
import "./MyCouponsItem.css";

interface MyCouponsItemProps {
  coupon: CouponModel;
}
function MyCouponsItem(props: MyCouponsItemProps): JSX.Element {
  return (
    <div className="card">
      <img src={props.coupon.image} alt="Coupon" />
      <h1>{props.coupon.title}</h1>
      <p className="price">${props.coupon.price}</p>
      <span>{props.coupon.company.name}</span>
      <hr />
      <span>{props.coupon.category}</span>
      <hr />
      <span>{props.coupon.description}</span>
      <hr />
      <span>{props.coupon.startDate.toString()}</span>
      <hr />
      <span>{props.coupon.endDate.toString()}</span>
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
    </div>
  );
}

export default MyCouponsItem;
