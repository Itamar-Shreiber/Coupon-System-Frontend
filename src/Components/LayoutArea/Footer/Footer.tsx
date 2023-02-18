import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer row">
            <p>&copy; Itamar Shreiber</p>
			 <SocialMedia/>
        </div>
    );
}

export default Footer;