import { ReactElement, ReactNode } from "react"

export interface TabItemProps {
  label: string
  children: ReactNode
  icon?: ReactNode | string
}

export interface TabListProps {
  tabClass?: string
  tabNavClass?: string
  tabListClass?: string
  activeTabIndex: number
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[]
}

export const sanitizeForId = (label: string) => {
  return label
    .toLowerCase()
    .replace(/[^\w\s]|(\s+)/g, (_match: string, group1: string) =>
      group1 ? "-" : ""
    )
}
