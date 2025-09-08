import React from "react"
import "./styles.scss"

/**
 * @description A reusable ProgressBar component to display a progress bar.
 * @component
 * @param {ProgressBarProps} props - The properties for the ProgressBar component.
 * @returns {JSX.Element} The ProgressBar component.
 */

const ProgressBar = (props) => {
  const {
    isLoading = false,
    percent =0,
    size = "small",
    showInfo = false
  } = props

  return (
    <div className="progress-outer">
      <div className={`progress ${size ? "progress--" + size : ""} ${isLoading ? "progress--" + "loading" : ""}`}>
        <div className={`progress-bar`} style={{ width: percent + "%" }} />
      </div>
      {isLoading == false && showInfo ? (<span className="progress-info">{percent}%</span>) : ("")}
    </div>
  )
}

export default ProgressBar
