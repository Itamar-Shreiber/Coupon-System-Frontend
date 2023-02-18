import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import "./CustomerItem.css";
import { CustomerModel } from "../../../Models/Model";

interface CustomerItemProps {
    customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {
    const navigate = useNavigate();

    const deleteCustomer = (customerId: number) => {
        navigate("/deleteCustomer/" + customerId);
    };

    const updateCustomer = (customerId: number) => {
        navigate("/updateCustomer/" + customerId);
    };
    return (
        <div className="CustomerItem">
            <div className="card">
                <h1>{props.customer.id}</h1>
                <span>{props.customer.firstName}</span>
                <hr />
                <span>{props.customer.lastName}</span>
                <hr />
                <span>{props.customer.email}</span>
                <hr />
                <div className="divButton">
                    <button
                        onClick={() => deleteCustomer(props.customer.id)}
                        className="button"
                    >
                        <VscTrash size={24} />
                    </button>
                    
                    <button 
                    onClick={() => updateCustomer(props.customer.id)}
                    className="button"
                    >
                        <BiEdit size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerItem;