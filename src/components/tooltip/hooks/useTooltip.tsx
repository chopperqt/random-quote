import React, { useEffect, useMemo } from 'react'
import { createImportSpecifier } from 'typescript'

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
  const tooltipSize = useMemo(() => {
    if (tooltip) {
      return {
        width: tooltip.clientWidth,
        height: tooltip.clientHeight,
      }
    }

    return {
      width: 0,
      height: 0,
    }
  }, [tooltip])

  const tooltipWrapSize = useMemo(() => {
    if (tooltipWrap) {
      return {
        width: tooltipWrap.clientWidth,
        height: tooltipWrap.clientHeight,
      }
    }

    return {
      width: 0,
      height: 0,
    }
  }, [tooltipWrap])


  let styleCenter = (tooltipWrapSize.height - tooltipSize.height) / 2

  return {
    styleCenter,
  }
}

export default useTooltip