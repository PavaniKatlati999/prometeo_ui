import React, { ReactNode } from "react"
import { TabItemProps, TabListProps, sanitizeForId } from "./types"

const TabItem: React.FC<TabItemProps> = ({ label, children, icon }) => (
  <div
    className="tab-panel"
    role="tabpanel"
    aria-labelledby={`tab-${sanitizeForId(label)}`}
    id={`panel-${sanitizeForId(label)}`}
  >
    {children}
  </div>
)

export default TabItem
