import classnames from 'classnames'
import React from "react"
import "./styles.scss"

/**
 * @function SpaceUI
 * @description This component is used to provide space between two elements
 */

const SpaceUI = (props: SpaceProps) => {

  const { children, className, style = {} } = props

  if (children === null || children === undefined) {
    return null
  }

  return (
    <div className={classnames(className, "ui__space")} style={style}>
      {children}
    </div>
  )
}

export default SpaceUI
