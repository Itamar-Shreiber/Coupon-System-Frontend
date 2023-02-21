import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../../SharedArea/Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header row">
            <Logo />
            <h1>Coupon System</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
