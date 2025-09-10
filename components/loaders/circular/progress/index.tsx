import React from "react"

import "./styles.scss"

/**
 *  A reusable CircularProgress component to display a loading animation.
 * @component
 * @param {CircularProgressProps} props - The properties for the CircularProgress component.
 * @returns {JSX.Element} The CircularProgress component.
 */

const CircularProgress = props => {

  return (
    <div
      className="backGroundFullScreen"
      style={{ position: props?.options?.position }}
    >
      <div
        className="loading_container"
        style={{ position: props?.options?.position }}
      >

        <div
          className="rotor"
          style={{
            borderWidth: props?.options?.thickness,
            animationDuration: props?.options?.speed,
            width: props?.options?.size,
            height: props?.options?.size
          }}
        />

        {
          props?.options?.counter &&
          <div className="loading_container">
            <span>
              {props?.options?.value}
            </span>
          </div>
        }

      </div>
    </div>
  )
}

export default CircularProgress
