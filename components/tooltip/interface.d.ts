interface TooltipProps {
  content?: React.ReactNode | string | number
  arrow?: boolean
  arrowSize?: number
  background?: string
  className?: string
  children: React.ReactNode | string | number
  color?: string
  direction?: string
  distance?: number
  eventOff?: string
  targetTouch?: boolean
  eventOn?: string
  eventToggle?: string
  forceDirection?: boolean
  hoverDelay?: number
  isOpen?: boolean
  mouseOutDelay?: number
  padding?: string
  styles?: React.CSSProperties
  tagName?: React.ElementType
  tipContentHover?: boolean
  tipContentClassName?: string
  useDefaultStyles?: boolean
  useHover?: boolean
  zIndex?: number
  onToggle?: (isOpen: boolean) => void
  arrowContent?: React.ReactNode
}

interface TooltipState {
  showTip: boolean
  hasHover: boolean
  ignoreShow: boolean
  hasBeenShown: boolean
  targetTouch?: boolean
  clientWidth?: number
  isOpen?: boolean
}
