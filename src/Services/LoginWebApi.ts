import { Credentials, User } from './../Models/Auth';
import axios, { AxiosResponse } from 'axios';

import global from './ConstantService';


class LoginWebApi {

   
    private authApi = global.urls.auth;


    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        console.log(credentials.clientType);
        const url=this.authApi+"/"+"login";
        return axios.post<User>(url, credentials);
    }

   
}

const loginWebApi = new LoginWebApi();
export default loginWebApi;