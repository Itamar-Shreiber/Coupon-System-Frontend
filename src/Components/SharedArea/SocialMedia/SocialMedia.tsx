import "./SocialMedia.css";
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";

function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <a href="https://www.linkedin.com/">
                <TiSocialLinkedin size={42} color="white" />
            </a>
            <a href="https://www.facebook.com/">
                <TiSocialFacebook size={42} color="white"/>
            </a>
            <a href="https://www.twitter.com/">
                <TiSocialTwitter size={42} color="white"/>
            </a>
        </div>
    );
}

export default SocialMedia;