import './Heading.scss';
import React, {ReactElement, ReactNode} from "react";

interface IProps {
    children?: ReactNode;
}

export default function Heading({children}: IProps): ReactElement {
    return (
        <div className="heading-container">
            {children}
        </div>
    )
}
