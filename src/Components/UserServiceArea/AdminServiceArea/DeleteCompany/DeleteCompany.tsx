import { useNavigate, useParams } from "react-router-dom";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/ErrorMessage";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {
    const navigate = useNavigate();

    const params = useParams();
    const companyId = +(params.id || 0);

    const cancel = () => {
        navigate("/getAllCompanies");
    };

    const deleteCompany = async () => {
        await adminWebApi
            .deleteCompany(companyId)
            .then((res) => {
                notify.success("Company deleted");
                navigate("/getAllCompanies");
            })
            .catch((err) => {
                notify.error(err);
            });
    };
    return (
        <div className="DeleteCompany col">
            <h2 className="redColor">Delete company {companyId}</h2>
            <h2>Are you sure?</h2>
            <div className="row">
                <button onClick={cancel}>cancel</button>
                <button onClick={deleteCompany}>yes</button>
            </div>
        </div>
    );
}

export default DeleteCompany;
