import "./DeleteCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/ErrorMessage";

function DeleteCustomer(): JSX.Element {
    const navigate = useNavigate();

    const params = useParams();
    const customerId = +(params.id || 0);

    const cancel = () => {
        navigate("/getAllCustomers");
    };

    const deleteCustomer = async () => {
        await adminWebApi
            .deleteCustomer(customerId)
            .then((res) => {
                notify.success("Customer deleted");
                navigate("/getAllCustomers");
            })
            .catch((err) => {
                notify.error(err);
            });
    };
    return (
        <div className="DeleteCustomer col">
            <h2 className="redColor">Delete customer {customerId}</h2>
            <h2>Are you sure?</h2>
            <div className="row">
            <button onClick={cancel}>cancel</button>
            <button onClick={deleteCustomer}>yes</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
