import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CompanyModel } from "../../../../Models/Model";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/ErrorMessage";

import CompanyItem from "../../../Items/CompanyItem/CompanyItem";
import "./GetSingleCompany.css";

type FormValues = {
    companyId: number;
};

function GetSingleCompany(): JSX.Element {
    const [companies, setCompanies] = useState(
        store.getState().adminReducer.companies
    );

    const [outputValue, setOutputValue] = useState<number>(0);
    const { register, handleSubmit } = useForm<FormValues>();
    const [companyToShow, setCompanyToShow] = useState<CompanyModel[]>([]);

    const handleChange = async (data: FormValues) => {
        setOutputValue(data.companyId);
    };

    useEffect(() => {
        if (outputValue !== 0) {
            adminWebApi
                .getSingleCompany(outputValue)
                .then((res) => {
                    setCompanyToShow([res.data]);
                    notify.success("company found");
                })
                .catch((err) => {
                    setCompanyToShow([]);
                    notify.error(err);
                });
        }
    }, [outputValue]);
    return (
        <div className="GetSingleCompany col">
            <h1>Find Company</h1>
            <div>
                <form onSubmit={handleSubmit(handleChange)}>
                    <input {...register("companyId")} type="number" />
                    <button className="find" type="submit">
                        Find
                    </button>
                </form>
            </div>
            <div>
                {companyToShow.map((c, idx) => (
                    <CompanyItem key={"c" + idx} company={c} />
                ))}
            </div>
        </div>
    );
}

export default GetSingleCompany;
