import "./UpdateCoupon.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponPayloadModel } from "../../../../Models/Model";
import { useNavigate, useParams } from "react-router-dom";
import companyWebApi from "../../../../Services/CompanyWebApi";
import notify from "../../../../Services/ErrorMessage";
import { useState } from "react";
import store from "../../../../Redux/Store";

function UpdateCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();
    const today = new Date();
    today.setHours(0,0,0,0);
    const [coupon, setCoupon] = useState(
        store
            .getState()
            .companyReducer.coupons.filter((coup) => coup.id === id)[0]
    );

    let defaultValuesObj = {
        ...{
            title: coupon.title,
            category: coupon.category,
            description: coupon.description,
            startDate: coupon.startDate,
            endDate: coupon.endDate,
            amount: coupon.amount,
            price: coupon.price,
            image: coupon.image,
        },
    };

    const updateCoupon = async (coupon: CouponPayloadModel) => {
        await companyWebApi
            .updateCoupon(id, coupon)
            .then((res) => {
                notify.success("Coupon updated");
                navigate("/companyCoupons");
            })
            .catch((err) => {
                notify.error(err);
            });
    };

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        category: yup.string().required("Category is required"),
        description: yup.string().required("Description is required"),
        startDate: yup
            .date()
            .min(today, "No option for previous time")
            .default(new Date())
            .typeError("You must specify a startDate")
            .required("StartDate is required")
            .nullable(),
        endDate: yup
            .date()
            .min(yup.ref("startDate"), "End date must be after start date")
            .default(new Date())
            .typeError("You must specify a endDate")
            .required("EndDate is required")
            .nullable(),
        price: yup
            .number()
            .moreThan(-1)
            .typeError("You must specify a number")
            .required("price is required"),
        amount: yup
            .number()
            .moreThan(-1)
            .typeError("You must specify a number")
            .required("Amount is required"),
        image: yup.string().required("Image is required"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
    } = useForm<CouponPayloadModel>({
        defaultValues: defaultValuesObj,
        mode: "all",
        resolver: yupResolver(schema),
    });

    const { dirtyFields } = useFormState({
        control,
    });

    return (
        <div className="UpdateCoupon col">
            <form onSubmit={handleSubmit(updateCoupon)}>
                {errors.title ? (
                    <span>{errors.title?.message}</span>
                ) : (
                    <label htmlFor="title">Title</label>
                )}
                <input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title..."
                />

                {errors.category ? (
                    <span>{errors.category?.message}</span>
                ) : (
                    <label htmlFor="category">Category</label>
                )}
                <select className="select" {...register("category")}>
                    <option value="default" disabled hidden>
                        Please choose category
                    </option>
                    <option value="FOOD">FOOD</option>
                    <option value="ELECTRICITY">ELECTRICITY</option>
                    <option value="VACATION">VACATION</option>
                    <option value="RESTAURANT">RESTAURANT</option>
                </select>

                {errors.description ? (
                    <span>{errors.description?.message}</span>
                ) : (
                    <label htmlFor="description">Description</label>
                )}
                <input
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description..."
                />

                {errors.startDate ? (
                    <span>{errors.startDate?.message}</span>
                ) : (
                    <label htmlFor="startDate">StartDate</label>
                )}
                <input
                    {...register("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    placeholder="StartDate..."
                />

                {errors.endDate ? (
                    <span>{errors.endDate?.message}</span>
                ) : (
                    <label htmlFor="endDate">EndDate</label>
                )}
                <input
                    {...register("endDate")}
                    id="endDate"
                    name="endDate"
                    type="date"
                    placeholder="EndDate..."
                />

                {errors.price ? (
                    <span>{errors.price?.message}</span>
                ) : (
                    <label htmlFor="price">Price</label>
                )}
                <input
                    {...register("price")}
                    id="price"
                    name="price"
                    type="double"
                    placeholder="Price..."
                />

                {errors.amount ? (
                    <span>{errors.amount?.message}</span>
                ) : (
                    <label htmlFor="amount">Amount</label>
                )}
                <input
                    {...register("amount")}
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Amount..."
                />

                {errors.image ? (
                    <span>{errors.image?.message}</span>
                ) : (
                    <label htmlFor="title">Image</label>
                )}
                <input
                    {...register("image")}
                    id="image"
                    name="image"
                    type="text"
                    placeholder="Image..."
                />
                <button disabled={!isValid}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
