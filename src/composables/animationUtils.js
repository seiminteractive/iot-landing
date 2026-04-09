export const MOBILE_LAYOUT_QUERY = '(max-width: 768px)'
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

export function isMobileLayout() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_LAYOUT_QUERY).matches
}

export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia(FINE_POINTER_QUERY).matches
}

export function isVisibleElement(element) {
  return Boolean(element && element.isConnected && element.offsetParent !== null)
}

export function afterNextPaint(callback) {
  let frameA = 0
  let frameB = 0

  frameA = requestAnimationFrame(() => {
    frameB = requestAnimationFrame(callback)
  })

  return () => {
    cancelAnimationFrame(frameA)
    cancelAnimationFrame(frameB)
  }
}

export function addHoverListeners(elements, onEnter, onLeave) {
  if (!hasFinePointer()) {
    return () => {}
  }

  const cleanups = []

  elements.forEach((element, index) => {
    if (!element) return

    const handleEnter = () => onEnter(element, index)
    const handleLeave = () => onLeave(element, index)

    element.addEventListener('mouseenter', handleEnter)
    element.addEventListener('mouseleave', handleLeave)

    cleanups.push(() => {
      element.removeEventListener('mouseenter', handleEnter)
      element.removeEventListener('mouseleave', handleLeave)
    })
  })

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}
