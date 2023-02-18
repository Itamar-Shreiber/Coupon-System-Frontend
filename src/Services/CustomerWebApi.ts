import axios, { AxiosResponse } from "axios";
import { CouponModel } from "../Models/Model";
import store from "../Redux/Store";
import global from "./ConstantService";

class CustomerWebApi {
    public getCustomerPurchaseCoupons(
        token: string
    ): Promise<AxiosResponse<CouponModel[]>> {
        const token2 = store.getState().userReducer.user.token;
        const headers = { authorization: token2 };
        const url = global.urls.customer + "/token/" + token + "/coupons";
        return axios.get<CouponModel[]>(url, { headers });
    }

    public couponsList(): Promise<AxiosResponse<CouponModel[]>> {
        const token2 = store.getState().userReducer.user.token;
        const headers = { authorization: token2 };
        const url = global.urls.admin + "/coupons";
        return axios.get<CouponModel[]>(url, { headers });
    }
    public purchaseCoupon(
        token: string,
        couponId: number
    ): Promise<AxiosResponse<any>> {
        //const token2 = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url =
            global.urls.customer + "/token/" + token + "/coupons/" + couponId;
        console.log(token);
        console.log(couponId);
        return axios.post<any>(url, { headers });
    }
}

const customerWebApi = new CustomerWebApi();
export default customerWebApi;
