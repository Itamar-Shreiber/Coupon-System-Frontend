import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import "./CompanyItem.css";
import { CompanyModel } from "../../../Models/Model";

interface CompanyItemProps {
    company: CompanyModel;
}

function CompanyItem(props: CompanyItemProps): JSX.Element {
    const navigate = useNavigate();

    const deleteCompany = (companyId: number) => {
        navigate("/deleteCompany/" + companyId);
    };

    const updateCompany = (companyId: number) => {
        navigate("/updateCompany/" + companyId);
    };

    return (

            <div className="card col">
                <h1>{props.company.id}</h1>
                <hr />
                <span>{props.company.name}</span>
                <hr />
                <span>{props.company.email}</span>
                <hr />
                <div className="divButton">
                    <button
                        onClick={() => deleteCompany(props.company.id)}
                        className="button1"
                    >
                        <VscTrash size={24} />
                    </button>
                    <button onClick={() => updateCompany(props.company.id)}
                    
                     className="button1">
                        <BiEdit size={24} />
                    </button>
                </div>
            </div>
      
    );
}

export default CompanyItem;