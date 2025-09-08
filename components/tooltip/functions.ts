
export const minArrowPadding = 5
export const bodyPadding = 10
export const noArrowDistance = 3

/**
 * @description Gets the current scroll top position.
 * @returns {number} The current scroll top position.
 */

export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

/**
 * @description Gets the current scroll left position.
 * @returns {number} The current scroll left position.
 */

export function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
}

/**
 * @description Gets the spacing for the arrow.
 * @param {object} props - The properties for the tooltip.
 * @returns {number} The spacing for the arrow.
 */

export function getArrowSpacing(props) {
  const defaultArrowSpacing = props.arrow ? props.arrowSize : noArrowDistance
  return typeof props.distance === 'number' ? props.distance : defaultArrowSpacing
}

/**
 * @description Gets the first ancestor element that might scroll.
 * @param {HTMLElement} element - The element to start searching from.
 * @returns {HTMLElement} The first ancestor element that might scroll.
 */

export function getScrollParent(element) {
  const style = getComputedStyle(element)
  let scrollParent = window

  if (style.position !== 'fixed') {
    let parent = element.parentElement

    while (parent) {
      const parentStyle = getComputedStyle(parent)

      if (/(auto|scroll)/.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
        scrollParent = parent
        parent = undefined
      } else {
        parent = parent.parentElement
      }
    }
  }

  return scrollParent
}
