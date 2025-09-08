// components/collapse/CollapseUI.tsx
import React from "react";

interface CollapseUIProps {
  in: boolean;
  children: React.ReactNode;
}

const CollapseUI: React.FC<CollapseUIProps> = ({ in: isOpen, children }) => {
  if (!isOpen) return null;
  return <div>{children}</div>;
};

export default CollapseUI;
