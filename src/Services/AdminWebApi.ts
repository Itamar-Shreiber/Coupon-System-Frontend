import axios, { AxiosResponse } from "axios";
import {
    CompanyModel,
    CompanyPayloadModel,
    CouponModel,
    CustomerModel,
    CustomerPayloadModel,
    CustomerUpdateModel,
} from "../Models/Model";
import global from "./ConstantService";
import { CompanyUpdateModel } from "./../Models/Model";
import store from "../Redux/Store";

class AdminWebApi {
    public addCompany = (
        company: CompanyPayloadModel
    ): Promise<AxiosResponse<any>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/companies";

        return axios.post<any>(url, company, { headers });
    };
    public addCustomer = (
        customer: CustomerPayloadModel
    ): Promise<AxiosResponse<any>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/customers";

        return axios.post<any>(url, customer, { headers });
    };
    public deleteCustomer = (
        customerId: number
    ): Promise<AxiosResponse<any>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/customers" + "/" + customerId;
        return axios.delete<any>(url, { headers });
    };

    public updateCustomer = (
        customerId: number,
        customer: CustomerUpdateModel
    ): Promise<AxiosResponse<CustomerModel>> => {
        const url = global.urls.admin + "/customers/" + customerId;
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        return axios.put<CustomerModel>(url, customer, { headers });
    };

    public updateCompany = (
        companyId: number,
        company: CompanyUpdateModel
    ): Promise<AxiosResponse<CompanyModel>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/companies/" + companyId;
        console.log(url);
        return axios.put<CompanyModel>(url, company, { headers });
    };

    public deleteCompany = (companyId: number): Promise<AxiosResponse<any>> => {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/companies" + "/" + companyId;
        console.log(url);
        return axios.delete<any>(url, { headers });
    };

    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/companies";
        return axios.get<CompanyModel[]>(url, { headers });
    }

    public getSingleCompany(
        companyId: number
    ): Promise<AxiosResponse<CompanyModel>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        const url = global.urls.admin + "/companies" + "/" + companyId;
        return axios.get<CompanyModel>(url, { headers });
    }

    public getSingleCustomer(
        customerId: number
    ): Promise<AxiosResponse<CustomerModel>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        return axios.get<CustomerModel>(
            global.urls.admin + "/customers" + "/" + customerId,
            { headers }
        );
    }

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        return axios.get<CouponModel[]>(global.urls.admin + "/coupons", {
            headers,
        });
    }

    public myCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        const token = store.getState().userReducer.user.token;
        const headers = { authorization: token };
        return axios.get<CustomerModel[]>(global.urls.admin + "/customers", {
            headers,
        });
    }
}

const adminWebApi = new AdminWebApi();
export default adminWebApi;
