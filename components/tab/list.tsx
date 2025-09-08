import React, { ReactElement, useState } from "react"
import TabItem from "./item"
import "./styles.scss"
import { TabItemProps, TabListProps, sanitizeForId } from "./types"

/**
 * @description A reusable TabList component to display a list of tabs.
 * @component
 * @param {TabListProps} props - The properties for the TabList component.
 * @returns {JSX.Element} The TabList component.
 */

const TabList: React.FC<TabListProps> = ({ children, activeTabIndex = 0, tabClass, tabNavClass, tabListClass }) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type === TabItem
  )

  return (
    <div className={`${tabClass} tab`}>
      <nav className={`${tabNavClass} tab-nav`}>
        <ul className={`${tabListClass} tab-list`} role="tablist" aria-orientation="horizontal">
          {tabs.map((tab, index) => (
            <li key={`tab-${index}`}>
              <button
                key={`tab-btn-${index}`}
                role="tab"
                id={`tab-${sanitizeForId(tab.props.label)}`}
                aria-controls={`panel-${sanitizeForId(tab.props.label)}`}
                aria-selected={activeTab === index}
                onClick={() => handleTabClick(index)}
                className={`tab-btn ${activeTab === index && "tab-btn--active"}`}
              >
                {tab.props.icon ? <span>{tab.props.icon}</span> : ""} {tab.props.label}
              </button>
              <div className={`tab-btn-shadow ${activeTab === index && "tab-btn-shadow--active"}`} />
            </li>
          ))}
           {/* <li className='tab-link-section cursor-pointer'>
            <img src='/svgs/maximize.svg' width={30} height={30} onClick={(e) => dispatch.openWindow(e, { id: "12345", type: "table" })} alt="Maximize icon" />
          </li> */}
        </ul>
      </nav>
      {tabs[activeTab]}
    </div>
  )
}

export default TabList
