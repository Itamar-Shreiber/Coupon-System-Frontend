import { useResolvedPath, useMatch, Link } from "react-router-dom";
import "./CustomLink.css";

interface CustomLinkProps {
    to: string;
    children: any;
}
function CustomLink(props: CustomLinkProps): JSX.Element {
    const resolved = useResolvedPath(props.to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
        <div className="topnav">
            <Link className={match ? "active" : "regular"} to={props.to}>
                {props.children}
            </Link>
        </div>
    );
}

export default CustomLink;
