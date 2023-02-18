import axios, { AxiosResponse } from "axios";
import { RandomUUIDOptions } from "crypto";
import { CouponModel, CouponPayloadModel } from "../Models/Model";
import store from "../Redux/Store";
import global from "./ConstantService";

class CompanyWebApi {
    public addCoupon = (
        token: string,
        coupon: CouponPayloadModel
    ): Promise<AxiosResponse<any>> => {
        const token2 = store.getState().userReducer.user.token;
        const headers = { authorization: token2 };
        const url = global.urls.company + "/" + token + "/coupons";
        console.log(url);
        return axios.post<any>(url, coupon, { headers });
    };

    public updateCoupon = (
        couponId: number,
        coupon: CouponPayloadModel
    ): Promise<AxiosResponse<CouponModel>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.company + "/" + token + "/coupons/" + couponId;
        return axios.put<CouponModel>(url, coupon, { headers });
    };

    public deleteCoupon = (couponId: number): Promise<AxiosResponse<any>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.company + "/" + token + "/coupons/" + couponId;
        console.log(url);
        return axios.delete<any>(url, { headers });
    };

    public getAllCompanyCoupons(
        token: string
    ): Promise<AxiosResponse<CouponModel[]>> {
        const token2 = store.getState().userReducer.user.token;
        const headers = { authorization: token2 };
        const url = global.urls.company + "/token/" + token + "/coupons";
        return axios.get<CouponModel[]>(url, { headers });
    }

    public getSingleCoupon(
        couponId: number
    ): Promise<AxiosResponse<CouponModel[]>> {
        const token2 = store.getState().userReducer.user.token;
        const headers = { authorization: token2 };
        const url = global.urls.company + "/coupons/" + couponId;
        return axios.get<CouponModel[]>(url, { headers });
    }
}
const companyWebApi = new CompanyWebApi();
export default companyWebApi;
