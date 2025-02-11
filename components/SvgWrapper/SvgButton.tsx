import React, { FC, HTMLAttributes } from "react";

import classes from "./SvgWrapper.module.scss";

interface SvgButtonProperties extends HTMLAttributes<HTMLDivElement> {
    SvgIcon: FC<React.SVGProps<SVGSVGElement>>;
    fillColor: string;
}

const SvgButton: FC<SvgButtonProperties> = ({ SvgIcon, fillColor, style, children, ...properties }) => {
    return (
        <div className={classes.parent} style={style} {...properties}>
            <SvgIcon className={classes.svgIcon} style={{ fill: fillColor }} />
            {children}
        </div>
    );
};

export default SvgButton;
