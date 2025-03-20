import React, { FC, HTMLAttributes, SVGProps } from "react";

import classes from "./SvgWrapper.module.scss";

interface SvgButtonProperties extends HTMLAttributes<HTMLDivElement> {
  SvgIcon: SVGProps<SVGSVGElement>;
  fillColor: string;
}

const SvgButton: FC<SvgButtonProperties> = ({
  SvgIcon,
  fillColor,
  style,
  children,
  ...properties
}) => {
  return (
    <div className={classes.parent} style={style} {...properties}>
      <SvgIcon
        // src={SvgIcon}
        className={classes.svgIcon}
        style={{ color: fillColor }}
      />
      {children}
    </div>
  );
};

export default SvgButton;
