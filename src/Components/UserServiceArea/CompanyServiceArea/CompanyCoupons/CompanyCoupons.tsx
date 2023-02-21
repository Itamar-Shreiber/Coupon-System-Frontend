import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Model";
import { gotAllCompanyCouponsAction } from "../../../../Redux/CompanyAppState";
import store from "../../../../Redux/Store";
import companyWebApi from "../../../../Services/CompanyWebApi";
import notify from "../../../../Services/ErrorMessage";
import CouponItem from "../../../Items/CouponItem/CouponItem";

import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
    const navigate = useNavigate();
    const addCoupon = () => {
        navigate("/addCoupon");
    };

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [origin, setOrigin] = useState<CouponModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState(300);
    const [user, setUser] = useState(store.getState().userReducer.user);
    useEffect(() => {
        companyWebApi
            .getAllCompanyCoupons(user.token)
            .then((res) => {
                store.dispatch(gotAllCompanyCouponsAction(res.data));
                setCoupons(res.data);
                setOrigin(res.data);
            })
            .catch((err) => notify.error(err));
    }, []);

    const all = origin;
    const byCategory = origin.filter((c) => c.category === selectedCategory);
    const byPrice = origin.filter((c) => c.price < selectedPrice);
    const byBoth = origin
        .filter((c) => c.category === selectedCategory)
        .filter((c) => c.price < selectedPrice);

    useEffect(() => {
        if (selectedCategory === "All" && selectedPrice === 300) {
            setCoupons(all);
            return;
        }
        if (selectedCategory === "All" && selectedPrice < 300) {
            setCoupons(byPrice);
            return;
        }
        if (selectedCategory !== "All" && selectedPrice === 300) {
            setCoupons(byCategory);
            return;
        }
        if (selectedCategory !== "All" && selectedPrice < 300) {
            setCoupons(byBoth);
            return;
        }
    }, [selectedCategory, selectedPrice]);
    const categoryOptions = [
        { value: "All", label: "All" },
        { value: "FOOD", label: "FOOD" },
        { value: "RESTAURANT", label: "RESTAURANT" },
        { value: "ELECTRICITYl", label: "ELECTRICITY" },
        { value: "VACATION", label: "VACATION" },
    ];

    const priceOptions = [
        { value: "All", label: "All" },
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "30", label: "30" },
        { value: "40", label: "40" },
        { value: "300", label: "300" },
    ];

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "10": {
                setSelectedPrice(10);
                break;
            }
            case "20": {
                setSelectedPrice(20);
                break;
            }
            case "30": {
                setSelectedPrice(30);
                break;
            }
            case "40": {
                setSelectedPrice(40);
                break;
            }
            default:
                setSelectedPrice(300);
                break;
        }
    };
    return (
        <div>
            <div className="PurchaseCouponArea col">
                <label htmlFor="category">Filter by category</label>
                <select id="category" onChange={handleCategoryChange}>
                    {categoryOptions.map((op, idx) => (
                        <option key={idx}>{op.label}</option>
                    ))}
                </select>
                <label htmlFor="price">Filter by price</label>
                <select id="price" onChange={handlePriceChange}>
                    {priceOptions.map((op, idx) => (
                        <option key={idx}>{op.label}</option>
                    ))}
                </select>
            </div>
            <div className="NavigateCoupon">
                <button className="Button" onClick={addCoupon}>
                    Add Coupon
                </button>
            </div>

            <div className="CompanyCoupons">
                {coupons.map((c, idx) => (
                    <CouponItem key={"c" + idx} coupon={c} />
                ))}
            </div>
        </div>
    );
}

export default CompanyCoupons;
