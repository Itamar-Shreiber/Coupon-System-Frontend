import axios, { AxiosResponse } from "axios";
import { CouponModel } from "../Models/Model";
import store from "../Redux/Store";
import global from "./ConstantService";

class CustomerWebApi {
    public getCustomerPurchaseCoupons(
    ): Promise<AxiosResponse<CouponModel[]>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.customer+"/coupons";
        return axios.get<CouponModel[]>(url, { headers });
    }

    public couponsList(): Promise<AxiosResponse<CouponModel[]>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/coupons";
        return axios.get<CouponModel[]>(url, { headers });
    }
    public purchaseCoupon(
        couponId: number
    ): Promise<AxiosResponse<any>> {
        const token = store.getState().userReducer.user.token;
        const headers = { Authorization: token };
        const url = global.urls.customer + "/coupons/" + couponId;
        return axios.post<any>(url, null, { headers });
    }
}

const customerWebApi = new CustomerWebApi();
export default customerWebApi;
