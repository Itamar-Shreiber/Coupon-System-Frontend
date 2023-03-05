import { useEffect, useState } from "react";
import "./PurchaseCoupon.css";
import { CouponModel } from "../../../../Models/Model";
import customerWebApi from "../../../../Services/CustomerWebApi";
import PurchaseCouponItem from "../../../Items/PurchaseCouponItem/PurchaseCouponItem";
import notify from "../../../../Services/ErrorMessage";
import store from "../../../../Redux/Store";


function PurchaseCoupon(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [origin, setOrigin] = useState<CouponModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState(300);
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>(
        store.getState().customerReducer.coupons
    );
    useEffect(() => {
        return store.subscribe(() =>
            setCustomerCoupons(store.getState().customerReducer.coupons)
        );
    }, []);
    
    useEffect(() => {
        customerWebApi
            .couponsList()
            .then((res) => {
                setCoupons(
                    res.data.filter((obj1) => {
                        return !customerCoupons.some(
                            (obj2) => obj1.id === obj2.id
                        );
                    })
                );
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
        { value: "ELECTRICITY", label: "ELECTRICITY" },
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
            <div className="PurchaseCoupon col">
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
            <div className="CompanyCoupons">
                {coupons.map((c, idx) => (
                    <PurchaseCouponItem key={"c" + idx} coupon={c} />
                ))}
            </div>
        </div>
    );
}

export default PurchaseCoupon;
