import React from 'react'

interface IUseTooltip {
  tooltip: HTMLDivElement | null
  tooltipWrap: HTMLDivElement | null
}

const useTooltip = ({
  tooltip,
  tooltipWrap,
}: IUseTooltip) => {
  const tooltipHeight = tooltip?.clientHeight
  const tooltipWrapHeight = tooltipWrap?.clientHeight

  return {
    tooltipHeight
  }
}

export default useTooltip