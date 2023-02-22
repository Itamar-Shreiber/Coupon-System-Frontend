import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../PagesArea/About/About";
import Developer from "../../PagesArea/Developer/Developer";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../../PagesArea/Page404/Page404";
import AddCoupon from "../../UserServiceArea/CompanyServiceArea/AddCoupon/AddCoupon";
import PurchaseCoupon from "../../UserServiceArea/CustomerServiceArea/PurchaseCoupon/PurchaseCoupon";
import GetAllCustomerPurchasedCoupons from "./../../UserServiceArea/CustomerServiceArea/GetAllCustomerPurchasedCoupons/GetAllCustomerPurchasedCoupons";
import GetAllCustomers from "../../UserServiceArea/AdminServiceArea/GetAllCustomers/GetAllCustomers";
import GetAllCompanies from "../../UserServiceArea/AdminServiceArea/GetAllCompanies/GetAllCompanies";
import DeleteCoupon from "../../UserServiceArea/CompanyServiceArea/DeleteCoupon/DeleteCoupon";
import CompanyCoupons from "../../UserServiceArea/CompanyServiceArea/CompanyCoupons/CompanyCoupons";
import AddCompany from "../../UserServiceArea/AdminServiceArea/AddCompany/AddCompany";
import UpdateCompany from "../../UserServiceArea/AdminServiceArea/UpdateCompany/UpdateCompany";
import DeleteCompany from "../../UserServiceArea/AdminServiceArea/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../UserServiceArea/AdminServiceArea/DeleteCustomer/DeleteCustomer";
import GetSingleCompany from "../../UserServiceArea/AdminServiceArea/GetSingleCompany/GetSingleCompany";
import GetSingleCustomer from "../../UserServiceArea/AdminServiceArea/GetSingleCustomer/GetSingleCustomer";
import UpdateCustomer from "../../UserServiceArea/AdminServiceArea/UpdateCustomer/UpdateCustomer";
import AddCustomer from "../../UserServiceArea/AdminServiceArea/AddCustomer/AddCustomer";
import UpdateCoupon from "../../UserServiceArea/CompanyServiceArea/UpdateCoupon/UpdateCoupon";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import store from "../../../Redux/Store";

function Routing(): JSX.Element {
    const token = store.getState().userReducer.user.token;
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
         
                  
                        <Route path="getAllCompanies" element={<GetAllCompanies />}
                        />
        


                <Route path="getAllCustomers" element={<GetAllCustomers />} />
                <Route path="getSingleCompany" element={<GetSingleCompany />} />
                <Route
                    path="getSingleCustomer"
                    element={<GetSingleCustomer />}
                />
                <Route path="addCompany" element={<AddCompany />} />
                <Route path="updateCompany/:id" element={<UpdateCompany />} />
                <Route path="deleteCompany/:id" element={<DeleteCompany />} />
                <Route path="addCustomer" element={<AddCustomer />} />
                <Route path="updateCustomer/:id" element={<UpdateCustomer />} />
                <Route path="deleteCustomer/:id" element={<DeleteCustomer />} />

                <Route path="addCoupon" element={<AddCoupon />} />
                <Route path="updateCoupon/:id" element={<UpdateCoupon />} />
                <Route path="deleteCoupon/:id" element={<DeleteCoupon />} />
                <Route path="companyCoupons" element={<CompanyCoupons />} />

                <Route path="purchase" element={<PurchaseCoupon />} />
                <Route
                    path="myCoupons"
                    element={<GetAllCustomerPurchasedCoupons />}
                />

                <Route path="about" element={<About />} />
                <Route path="developer" element={<Developer />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
