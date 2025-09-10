import React from 'react'
import { getScrollParent } from './functions'
import positions from './position'
import Portal from './viewPortal'
import "./styles.scss"


// default colors
const defaultColor = 'white'
const defaultBg = '#005DB4'

const resizeThrottle = 100
const resizeThreshold = 5

const stopProp = (e: React.MouseEvent) => e.stopPropagation()
/**
 * A Tooltip component to display brief contextual information when a user hovers over,
 * focuses on, or clicks an element. Supports custom content, placement, trigger events,
 * and delay. Useful for hints, guidance, or clarifying UI elements without cluttering
 * the interface.
 */


class Tooltip extends React.Component<TooltipProps, TooltipState> {
  static defaultProps = {
    content: '',
    arrow: true,
    arrowSize: 7,
    background: '#005DB4',
    className: '',
    color: 'white',
    direction: 'up',
    distance: undefined,
    eventOff: undefined,
    targetTouch: undefined,
    eventOn: undefined,
    eventToggle: undefined,
    forceDirection: false,
    hoverDelay: 200,
    isOpen: undefined,
    mouseOutDelay: undefined,
    padding: '5px',
    styles: {},
    tagName: 'div',
    tipContentHover: false,
    tipContentClassName: undefined,
    useDefaultStyles: false,
    useHover: true,
    zIndex: 1000,
    onToggle: undefined,
    arrowContent: null,
  };

  static getDerivedStateFromProps(nextProps: TooltipProps) {
    return nextProps.isOpen ? { hasBeenShown: true } : null
  }

  debounceTimeout: NodeJS.Timeout | null = null;
  hoverTimeout: NodeJS.Timeout | null = null;
  target: HTMLElement | null = null;
  tip: HTMLElement | null = null;
  scrollParent: HTMLElement | null = null;

  constructor(props: TooltipProps) {
    super(props)

    this.state = {
      showTip: false,
      hasHover: false,
      ignoreShow: false,
      hasBeenShown: false,
      isOpen: false
    }

    this.showTip = this.showTip.bind(this)
    this.hideTip = this.hideTip.bind(this)
    this.checkHover = this.checkHover.bind(this)
    this.toggleTip = this.toggleTip.bind(this)
    this.startHover = this.startHover.bind(this)
    this.endHover = this.endHover.bind(this)
    this.listenResizeScroll = this.listenResizeScroll.bind(this)
    this.handleResizeScroll = this.handleResizeScroll.bind(this)
    this.bodyTouchStart = this.bodyTouchStart.bind(this)
    this.bodyTouchEnd = this.bodyTouchEnd.bind(this)
    this.targetTouchStart = this.targetTouchStart.bind(this)
    this.targetTouchEnd = this.targetTouchEnd.bind(this)
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.setState({ isOpen: true })
    }

    this.scrollParent = getScrollParent(this.target) as any

    window.addEventListener('resize', this.listenResizeScroll)
    this.scrollParent?.addEventListener('scroll', this.listenResizeScroll)
    window.addEventListener('touchstart', this.bodyTouchStart)
    window.addEventListener('touchend', this.bodyTouchEnd)
  }

  componentDidUpdate(prevProps: TooltipProps, prevState: TooltipState) {
    if (prevProps.content !== this.props.content) {
      this.hideTip()
    }

    if (!this.state.hasBeenShown && this.props.isOpen) {
      this.setState({ hasBeenShown: true })
      return setTimeout(this.showTip, 0)
    }

    if (!prevState.hasBeenShown && this.state.hasBeenShown) {
      this.showTip()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listenResizeScroll)
    this.scrollParent?.removeEventListener('scroll', this.listenResizeScroll)
    window.removeEventListener('touchstart', this.bodyTouchStart)
    window.removeEventListener('touchend', this.bodyTouchEnd)
    if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout)
  }

  listenResizeScroll() {
    if (this.debounceTimeout) clearTimeout(this.debounceTimeout)

    this.debounceTimeout = setTimeout(this.handleResizeScroll, resizeThrottle)

    if (this.state.targetTouch) {
      this.setState({ targetTouch: undefined })
    }
  }

  handleResizeScroll() {
    if (this.state.showTip) {
      const clientWidth = Math.round(document.documentElement.clientWidth / resizeThreshold) * resizeThreshold
      this.setState({ clientWidth })
    }
  }

  targetTouchStart() {
    this.setState({ targetTouch: true })
  }

  targetTouchEnd() {
    if (this.state.targetTouch) {
      this.toggleTip()
    }
  }

  bodyTouchEnd() {
    if (this.state.targetTouch) {
      this.setState({ targetTouch: undefined })
    }
  }

  bodyTouchStart(e: React.TouchEvent | any) {
    if (!(this.target && this.target.contains(e.target as Node)) && !(this.tip && this.tip.contains(e.target as Node)) && !this.props.isOpen) {
      this.hideTip()
    }
  }

  toggleTip() {
    this.state.showTip ? this.hideTip() : this.showTip()
  }

  showTip() {
    if (!this.state.hasBeenShown) {
      return this.setState({ hasBeenShown: true })
    }

    if (!this.state.showTip) {
      this.setState({ showTip: true }, () => {
        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(this.state.showTip)
        }
      })
    }
  }

  hideTip() {
    this.setState({ hasHover: false })

    if (this.state.showTip) {
      this.setState({ showTip: false }, () => {
        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(this.state.showTip)
        }
      })
    }
  }

  startHover() {
    if (!this.state.ignoreShow) {
      this.setState({ hasHover: true })

      if (this.hoverTimeout) clearTimeout(this.hoverTimeout)
      this.hoverTimeout = setTimeout(this.checkHover, this.props.hoverDelay || 0)
    }
  }

  endHover() {
    this.setState({ hasHover: false })

    if (this.hoverTimeout) clearTimeout(this.hoverTimeout)
    this.hoverTimeout = setTimeout(this.checkHover, this.props.mouseOutDelay || this.props.hoverDelay || 0)
  }

  checkHover() {
    this.state.hasHover && this.props.content ? this.showTip() : this.hideTip()
  }

  render() {
    const {
      arrow,
      arrowSize,
      background,
      className,
      children,
      color,
      content,
      direction,
      distance,
      eventOff,
      eventOn,
      eventToggle,
      forceDirection,
      isOpen,
      mouseOutDelay,
      padding,
      styles,
      tagName: TagName,
      tipContentHover,
      tipContentClassName,
      useDefaultStyles,
      useHover,
      arrowContent,
    } = this.props

    const isControlledByProps = typeof isOpen !== 'undefined' && isOpen !== null
    const showTip = isControlledByProps ? isOpen : this.state.showTip

    const wrapperStyles: React.CSSProperties = {
      position: 'relative',
      ...styles,
    }

    const props: React.HTMLProps<HTMLElement> = {
      style: wrapperStyles,
      ref: (target) => { this.target = target },
      className,
    }

    const portalProps = {
      onClick: stopProp,
      onMouseEnter: stopProp,
      onMouseLeave: stopProp,
      onTouchStart: stopProp
    } as any

    if (eventOff) {
      props[eventOff] = this.hideTip
    }

    if (eventOn) {
      props[eventOn] = this.showTip
    }

    if (eventToggle) {
      props[eventToggle] = this.toggleTip
    } else if (useHover && !isControlledByProps) {
      props.onMouseEnter = this.startHover
      props.onMouseLeave = (tipContentHover || mouseOutDelay) ? this.endHover : this.hideTip
      props.onTouchStart = this.targetTouchStart
      props.onTouchEnd = this.targetTouchEnd

      if (tipContentHover) {
        portalProps.onMouseEnter = this.startHover
        portalProps.onMouseLeave = this.endHover
        portalProps.onTouchStart = stopProp
      }
    }

    let tipPortal

    if (this.state.hasBeenShown) {
      const currentPositions = positions(direction, forceDirection, this.tip, this.target, { ...this.state, showTip }, {
        background: useDefaultStyles ? defaultBg : background,
        arrow,
        arrowSize,
        distance,
      })

      const tipStyles: React.CSSProperties = {
        ...currentPositions.tip,
        background: useDefaultStyles ? defaultBg : background,
        color: useDefaultStyles ? defaultColor : color,
        padding,
        fontSize: '14px',
        boxSizing: 'border-box',
        borderRadius: '3px',
        width: 'max-content',
        maxWidth: '250px',
        zIndex: this.props.zIndex,
        position: 'absolute',
        display: 'inline-block',
      }

      const arrowStyles: React.CSSProperties = {
        ...currentPositions.arrow.positionStyles,
        ...(arrowContent ? {} : currentPositions.arrow.borderStyles),
        position: 'absolute',
        width: '0px',
        height: '0px',
        zIndex: this.props.zIndex + 1,
      }

      tipPortal = (
        <Portal>
          <div {...portalProps} className={tipContentClassName || className}>
            <span
              className={`tooltip-bubble ${tipContentClassName || ''}`}
              style={tipStyles}
              ref={(tip) => { this.tip = tip }}
            >
              {content}
            </span>

            <span
              className={`tooltip-arrow ${currentPositions.realDirection}-arrow`}
              style={arrowStyles}
            >
              {arrowContent}
            </span>

          </div>
        </Portal>
      )
    }

    return (
      <TagName {...props}>
        {children}
        {tipPortal}
      </TagName>
    )
  }
}

export default Tooltip
