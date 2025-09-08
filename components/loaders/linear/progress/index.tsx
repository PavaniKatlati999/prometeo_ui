import React from 'react'
import './styles.scss'

/**
 * @description A reusable LinearProgress component to display a linear progress bar.
 * @component
 * @param {LinearProgressLoaderProps} props - The properties for the LinearProgress component.
 * @returns {JSX.Element} The LinearProgress component.
 */

interface LinearProgressLoaderProps {
  size?: string
  value?: number
  borderRadius?: string
  color?: string
  backgroundColor?: string
}

const LinearProgress = ({
  size = '100px',
  value = 50,
  borderRadius = '4px',
  color = '#000',
  backgroundColor = '#005DB4',
}: LinearProgressLoaderProps) => {

  return (
    <div className="linear-progress-container" style={{ width: size }}>
      <div className="linear-progress-bar" style={{ width: `${value}%`, color, backgroundColor, borderRadius }} />
    </div>
  )
}

export default LinearProgress
