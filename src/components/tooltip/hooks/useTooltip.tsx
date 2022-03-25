import React from 'react'

import { TTooltipPosition } from '../'
interface IUseTooltip {
  tooltip: HTMLDivElement | null
  tooltipWrap: HTMLDivElement | null
  position: TTooltipPosition
}

const useTooltip = ({
  tooltip,
  tooltipWrap,
  position,
}: IUseTooltip) => {
  const tooltipHeight = tooltip?.clientHeight || 0
  const tooltipWrapHeight = tooltipWrap?.clientHeight || 0
  const tooltipWidth = tooltip?.clientWidth || 0
  const tooltipWrapWidth = tooltipWrap?.clientWidth || 0

  let styleCenter = (tooltipWrapHeight - tooltipHeight) / 2

  const handleShowTooltip = () => {
    tooltip?.classList.add('tooltip-in')
  }

  const handleHideTooltip = () => {
    tooltip?.classList.remove('tooltip-in')
  }

  tooltipWrap?.addEventListener('mouseenter', handleShowTooltip)
  tooltipWrap?.addEventListener('mouseleave', handleHideTooltip)

  return {
    styleCenter,
  }
}

export default useTooltip