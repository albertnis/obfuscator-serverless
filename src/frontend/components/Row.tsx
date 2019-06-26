import React from "react";

export default ({children, className}: {children: any, className: string}) => (
  <div className={`row${className === '' ? '' : ` ${className}`}`}>
    <div className="row-content">
      {children}
    </div>
  </div>
)